'use strict';
import googleMaps from '@google/maps';

//use one maps client
const MAPS = googleMaps.createClient({
  key: process.env.GOOGLE_MAPS_KEY,
  Promise: Promise
});

export default function getTravelTime (fromPlaceId, toPlaceId) {
  console.log('about to get directions from ' + fromPlaceId + ' to ' +toPlaceId);
  let query = {
    origin: 'place_id:' + fromPlaceId,
    destination: 'place_id:' + toPlaceId,
  };

  return MAPS.directions(query).asPromise();
}