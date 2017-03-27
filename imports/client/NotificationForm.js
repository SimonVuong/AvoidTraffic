'use strict';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';

function NotificationForm () {
  return (
    <Form>
      <Form.Group>
        <Form.Field width={16}>
          <label>From</label>
          <Autocomplete
            placeholder='Enter starting location'
            onPlaceSelected={(place) => {console.log(place);}}
            types={['establishment', 'geocode']} /> {/*autocomplete places and addresses*/}
        </Form.Field>
      </Form.Group>
      <Form.Group>
       <Form.Field width={16}>
          <label>To</label>
          <Autocomplete
            placeholder='Enter destination location'
            onPlaceSelected={(place) => {console.log(place);}}
            types={['establishment', 'geocode']} />
        </Form.Field>
      </Form.Group>
      Notify when the travel time is below
      <Form.Group >
       <Form.Field
          width={6}
          control='Input'
          label='hr'
          type='number'
          placeholder='0'>
        </Form.Field>
        <Form.Field
          width={6}
          control='Input'
          label='min'
          type='number'
          placeholder='0'>
        </Form.Field>
      </Form.Group>
      Notification method
      <Form.Group >
       <Form.Field
          control='Input'
          label='Email'
          width={16}
          type='Email'
          placeholder='you@example.com'>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field
          control='Input'
          label='Phone'
          width={16}
          type='text'
          placeholder='(xxx) xxx-xxxx'>
        </Form.Field>
      </Form.Group>
      {/*type=button to prevent submitting*/}
      <Button type='button' primary>Set notification</Button>
    </Form>
  )
}

export default NotificationForm;