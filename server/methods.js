import { Meteor } from 'meteor/meteor';
import sendText from './textService';
import googleMaps from '@google/maps'

//use one maps client
let maps = googleMaps.createClient({
  key: 'AIzaSyA30HDli8UuK1stNdNAfm_eN761_hm96iI' //TODO: use environment variables
});

function getTravelTime (fromPlaceId, toPlaceId, callback) {
  let query = {
    origin: 'place_id:' + fromPlaceId,
    destination: 'place_id:' + toPlaceId,
  };

  maps.directions(query, callback);
}

Meteor.methods({
  setNotification (fromPlaceId, toPlaceId, minSeconds, email, phone) {
    //TODO: add validation

    let count = 0;
    let timer;

    let checkTraffic = function (fromPlaceId, toPlaceId, minSeconds, connectionId) {
      count++;

      //if i checked x times for y seconds, then the alert expires.
      //TODO TEMPORARY: 3 for now. when we change to 5 minute interval, we need counter to be number
      //such that alert expires after 1 hr
      console.log(connectionId);
      if (count === 3) {
        console.log('alert expired');
        clearInterval(timer);
      }

      let travelSeconds = getTravelTime(fromPlaceId, toPlaceId, function (err, res) {
        if (err) {
          console.log(err);
        }

        //we are guaranteed to have only 1 route because the query doesnt set alternatives: true
        //legs are 'sections' of the directions that are created by waypoints. so if there are no
        //waypoints, routes is guaranteed to have 1 leg
        travelSeconds = res.json.routes[0].legs[0].duration.value;
        console.log(travelSeconds);
        //TODO TEMPORARY: true to always send notification
        if (travelSeconds <= minSeconds || true) {
          sendText(phone, 'sup');
          clearInterval(timer);
        } 
        
      })



    }

    timer = setInterval(checkTraffic, 5000, fromPlaceId, toPlaceId, minSeconds, this.connection.id);
  }
});

      /*
      TODO

      check traffic

      is traffic time good?
        yes
          send alert
          clear interval
        no
          do nothing

      */