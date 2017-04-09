'use strict';
import googleMaps from '@google/maps';

//use one maps client
const MAPS = googleMaps.createClient({
  key: process.env.GOOGLE_MAPS_KEY,
  Promise: Promise
});

export default function getTravelTime (fromPlaceId, toPlaceId) {
  let query = {
    origin: 'place_id:' + fromPlaceId,
    destination: 'place_id:' + toPlaceId,
    departure_time: new Date()//otherwise we dont get duration based on traffic
  };

  console.log(query);

  return MAPS.directions(query).asPromise();
}