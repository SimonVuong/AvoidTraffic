import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import Form from './Form';

function NotificationForm (props) {
  return (
    <Grid columns={1}>
      <Grid.Column style={{background: '#2185d0'}}>
        <Header size='huge' style={{color: '#FFFFFF'}}>
          <Header.Content>
            Traffic Alert
          </Header.Content>

{/*}        dont need for now because will move to middle of page load 
          <Header.Subheader style={{color: '#FFF5EE'}}>
            Receive an alert when driving time is acceptable
          </Header.Subheader> */}
        </Header>
      </Grid.Column>
      <Grid.Column>
        <Form onSelectFrom={props.onSelectFrom} onSelectTo={props.onSelectTo} />
      </Grid.Column>
      <Grid.Column>
 {/*     <p style={{color: '#A9A9A9'}}>*Traffic Alert erases all data after a notification is 
          sent or is expired. It does not share your information with third parties.
        </p> */}
      </Grid.Column>
    </Grid>

            
            


  )
}

export default NotificationForm;