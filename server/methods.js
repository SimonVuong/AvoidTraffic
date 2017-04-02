import { Meteor } from 'meteor/meteor';
import { isValidNumber } from 'libphonenumber-js'
import SimpleSchema from 'simpl-schema';
import sendText from './textService';
import getTravelTime from './directionsService';

const ALERT_EXPERATION_SECONDS = 120; //2 mins
const ALERT_ATTEMPT_INTERVAL_MILISECONDS = 30000; //30 seconds
//ceil to give the user 1 more attempt
const MAX_ALERT_ATTEMPTS = Math.ceil(ALERT_EXPERATION_SECONDS / (ALERT_ATTEMPT_INTERVAL_MILISECONDS / 1000));

function convertSecondsToText (seconds) {
  let mins = Math.floor(seconds / 60);
  let hrs = Math.floor(mins / 60);

  if (mins >= 60) {
    mins = mins % 60;
  }

  if (hrs === 1) {
    hrs = hrs + ' hr';
  } else {
    hrs = hrs + ' hrs';
  }

  if (mins === 1) {
    mins = mins + ' min';
  } else {
    mins = mins + ' mins';
  }

  return hrs + ' and ' + mins;
}

//TODO FUTURE: send link for google maps when sending alert
Meteor.methods({
  setAlert (fromPlaceId, toPlaceId, fromText, toText, minSeconds, phone) {

    try {
      new SimpleSchema({
        fromPlaceId: { type: Number },
        toPlaceId: { type: String },
        fromText: { type: String },
        toText: { type: String },
        minSeconds: { type: Number, min: 0 },
        phone: { type: String, custom: function () { return (isValidNumber(this.value, 'US')) } },
      }).validate({ fromPlaceId, toPlaceId, fromText, toText, minSeconds, phone });
    } catch (err) {
      //TODO FUTURE: figure out how to say which field caused error. err obj doenst have easy string
      throw new Meteor.Error('validation error', err.details[0],
      'One of the inputs is invalid. Please check your inputs');
    }



    console.log('received alert set');
    let attempts = 1;
    let connectionId = this.connection.id;

    let attemptAlert = function () {
      console.log('attempting alert ' + attempts + ' for ' + connectionId + ' with ' + minSeconds + ' threshold');
      attempts++;

      if (attempts > MAX_ALERT_ATTEMPTS) {
        console.log('alert expired');
        sendText(phone, 'Sorry. Your alert has expired after ' + convertSecondsToText(ALERT_EXPERATION_SECONDS) 
          +'. Traffic from ' + fromText + ' to ' +toText + ' never decreased to '
          + convertSecondsToText(minSeconds) + ' or less.');
        clearInterval(timer);
      }

      getTravelTime(fromPlaceId, toPlaceId).then((res) => {
        //we are guaranteed to have only 1 route because the query doesnt set alternatives: true
        //legs are 'sections' of the directions that are created by waypoints. so if there are no
        //waypoints, routes is guaranteed to have 1 leg
        let travelTime = res.json.routes[0].legs[0].duration;
        console.log('travel time is ' + travelTime.text);
        if (travelTime.value <= minSeconds) {
          sendText(phone, 'Drive is ' + travelTime.text + ' from ' + fromText 
          + ' to ' + toText + '.');
          clearInterval(timer);
        }
      }).catch((err) => {
        throw new Meteor.Error('google maps error', {fromPlaceId, toPlaceId}, 
        'Google maps service failed. Please try again later');
        clearInterval(timer);
      });
    }

    let timer = setInterval(attemptAlert, ALERT_ATTEMPT_INTERVAL_MILISECONDS);
  }
});