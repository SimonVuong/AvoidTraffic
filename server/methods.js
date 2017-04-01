import { Meteor } from 'meteor/meteor';
import sendText from './textService';
import getTravelTime from './directionsService';

Meteor.methods({
  setAlert (fromPlaceId, toPlaceId, minSeconds, email, phone) {
    //TODO: add validation
    console.log('received alert set');
    let count = 1;
    let connectionId = this.connection.id;

    let attemptAlert = function () {
      console.log('attempting alert ' + count + ' for ' + connectionId);
      count++;

      //if i checked x times for y seconds, then the alert expires.
      //TODO TEMPORARY: 3 for now. when we change to 5 minute interval, we need counter to be number
      //such that alert expires after 1 hr
      if (count === 4) {
        console.log('alert expired');
        clearInterval(timer);
      }

      getTravelTime(fromPlaceId, toPlaceId).then((res) => {
        //we are guaranteed to have only 1 route because the query doesnt set alternatives: true
        //legs are 'sections' of the directions that are created by waypoints. so if there are no
        //waypoints, routes is guaranteed to have 1 leg
        travelSeconds = res.json.routes[0].legs[0].duration.value;
        console.log('travel time is ' + travelSeconds);
        if (travelSeconds <= minSeconds || true) {//TODO TEMP: true always to send text
          sendText(phone, 'sup');
          clearInterval(timer);
        }
      }).catch((err) => {
        console.log(err);
        clearInterval(timer);
      });
    }

    let timer = setInterval(attemptAlert, 5000);
  }
});