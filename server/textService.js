'use strict';
import twilio from 'twilio';

//todo: PUT THESE IN ENV variables
const ACCOUNT_SID = 'ACe31cd8b705c2a9bf21c1b5c6db8900b7'
const AUTH_TOKEN = '5e465dd9ebcfa83edc142df3a1fb9f7e';
const MY_NUMBER = '+16093859646'

let textService = twilio(ACCOUNT_SID, AUTH_TOKEN);

function sendText (number, message) {
  textService.messages.create({
    to: '+16095138166',
    from: '+16093859646',
    body: 'traffic iz gud'
  }, function (err, message) {
    if (err) {
      console.log(err);
    } else {
      console.log(message);
    }
  })
}