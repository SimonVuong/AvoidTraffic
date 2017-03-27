'use strict';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import NotificationForm from './NotificationForm';

function MainLayout () {
  return (
    <Grid padded style={{height: 'inherit'}}>
      <Grid.Column width={5}>
        <NotificationForm />
      </Grid.Column>
      <Grid.Column width={11}>
        <iframe width="600" height="450"
          src="https://www.google.com/maps/embed/v1/directions?origin=place_id:EioxNiBSYWluYm93IERyLCBNYXlzIExhbmRpbmcsIE5KIDA4MzMwLCBVU0E&destination=place_id:ChIJa2teuNymw4kRjUv0voLCbkA&key=AIzaSyCMmu_dSLLqfqhlnGpLyuyQazYaG_m_Qcs"
        ></iframe>
      </Grid.Column>
    </Grid>
  )
}

export default MainLayout;