import { Meteor } from 'meteor/meteor';
import sendText from './textService';
import getTravelTime from './directionsService';

const ALERT_EXPERATION_SECONDS = 300; //5 mins
const ALERT_ATTEMPT_INTERVAL_MILISECONDS = 60000; //1 min
const MAX_ALERT_ATTEMPTS = Math.ceil(ALERT_EXPERATION_SECONDS / (ALERT_ATTEMPT_INTERVAL_MILISECONDS / 1000));

//TODO SIMON: include address/location so that the texts are more user friendly
Meteor.methods({
  setAlert (fromPlaceId, toPlaceId, minSeconds, email, phone) {
    //TODO: add validation
    console.log('received alert set');
    let attempts = 1;
    let connectionId = this.connection.id;

    let attemptAlert = function () {
      console.log('attempting alert ' + attempts + ' for ' + connectionId + ' with ' + minSeconds + ' threshold');
      attempts++;

      if (attempts > MAX_ALERT_ATTEMPTS) {
        console.log('alert expired');
        //TODO SIMON: use hr and min to be more user friendly!
        sendText(phone, 'Sorry. Your alert has expired after ' + ALERT_EXPERATION_SECONDS 
          +'. Traffic never decreased to ' + minSeconds + ' or less.');
        clearInterval(timer);
      }

      getTravelTime(fromPlaceId, toPlaceId).then((res) => {
        //we are guaranteed to have only 1 route because the query doesnt set alternatives: true
        //legs are 'sections' of the directions that are created by waypoints. so if there are no
        //waypoints, routes is guaranteed to have 1 leg
        let travelTime = res.json.routes[0].legs[0].duration;
        console.log('travel time is ' + travelTime.text);
        if (travelTime.value <= minSeconds) {
          sendText(phone, 'Traffic is better. Drive is ' + travelTime.text + '.');
          clearInterval(timer);
        }
      }).catch((err) => {
        console.log(err);
        clearInterval(timer);
      });
    }

    let timer = setInterval(attemptAlert, ALERT_ATTEMPT_INTERVAL_MILISECONDS);
  }
});