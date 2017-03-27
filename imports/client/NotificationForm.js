'use strict';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';

function NotificationForm () {
  return (
    <Form>
      <Form.Group>
        <Form.Field>
          <label>
            From
          </label>
          <Autocomplete
            placeholder='Enter starting location'
            onPlaceSelected={(place) => {console.log(place);}}
            types={['establishment', 'geocode']} /> {/*autocomplete places and addresses*/}
        </Form.Field>
      </Form.Group>
      <Form.Group>
       <Form.Field
          control='Input'
          label='To'
          type='text'
          placeholder='Enter destination location'>
        </Form.Field>
      </Form.Group>

      {/*type=button to prevent submitting*/}
      <Button type='button'>Submit</Button>
    </Form>
  )
}

export default NotificationForm;