import { Meteor } from 'meteor/meteor';

Meteor.methods({
  setNotification (fromPlaceId, toPlaceId, hr,  min,  email, phone) {
    //TODO: add validation



    let count = 0;
    let timer;

    let checkTraffic = function (fromPlaceId, toPlaceId, hr,  min, connectionId) {
      count++;

      //if i checked x times for y seconds, then the alert expires.
      //TODO TEMPORARY: 3 for now. when we change to 5 minute interval, we need counter to be number
      //such that alert expires after 1 hr
      console.log(connectionId);
      if (count === 3) {
        console.log('alert expired');
        clearInterval(timer);
      }

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

    }

    timer = setInterval(checkTraffic, 1000, fromPlaceId, toPlaceId, hr,  min, this.connection.id);
  }
});