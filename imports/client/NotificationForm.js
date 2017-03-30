import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import Form from './Form';

function NotificationForm (props) {
  return (
    <Grid columns={1}>
      {/*make header container blue*/}
      <Grid.Column style={{background: '#2185D0'}}>
        {/*3em is 1em larger than 'huge'*/}
        <Header style={{color: '#FFFFFF', fontSize: '3em'}}>
          Traffic Alert
        </Header>
      </Grid.Column>
      <Grid.Column>
        <Form onSelectFrom={props.onSelectFrom} onSelectTo={props.onSelectTo} />
      </Grid.Column>
      <Grid.Column style={{color: '#A9A9A9', paddingTop: 0}}>
        *Traffic Alert erases all data after an alert is complete. It does not sell or rent your data.
      </Grid.Column>
    </Grid>
  )
}

export default NotificationForm;