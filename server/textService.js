'use strict';
import twilio from 'twilio';

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const MY_NUMBER = '+16093859646'

let textService = twilio(ACCOUNT_SID, AUTH_TOKEN);

export default function sendText (to, body) {
  console.log('about to send text');
  textService.messages.create({
    to,
    from: MY_NUMBER,
    body
  }, function (err, message) {
    if (err) {
      console.log(err);
    } else {
      console.log('sent message');
    }
  })
}