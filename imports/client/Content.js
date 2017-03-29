import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import NotificationForm from './NotificationForm';

function Content (props) {
  return (
    <Grid columns={1}>
      <Grid.Column style={{background: '#21BA45'}}>
        <Header size='large' style={{color: '#FFFFFF'}}>
          Avoid Traffic
          <Header.Subheader style={{color: '#FFF5EE'}}>
            Receive a text or email when driving time is acceptable
          </Header.Subheader>
        </Header>
      </Grid.Column>
      <Grid.Column>
        <NotificationForm onSelectFrom={props.onSelectFrom} onSelectTo={props.onSelectTo} />
      </Grid.Column>
      <Grid.Column>
        <p style={{color: '#A9A9A9'}}>*Avoid Traffic does not store any data after a notification is 
          sent or is expired. It does not share your information with third parties.
        </p>
      </Grid.Column>
    </Grid>

            
            


  )
}

export default Content;