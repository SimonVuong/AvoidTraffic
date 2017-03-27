'use strict';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import NotificationForm from './NotificationForm';

function MainLayout () {
  return (
    <Grid padded>
      <Grid.Column width={4}>
        <NotificationForm />
      </Grid.Column>
      <Grid.Column width={12}>
        right
      </Grid.Column>
    </Grid>
  )
}

export default MainLayout;