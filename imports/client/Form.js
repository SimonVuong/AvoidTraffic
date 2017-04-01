'use strict';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';

//TODO left off here. working on setNotification
class MyForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hr: '',
      min: '',
      email: '',
      phone: ''
    }
    this.setNotification = this.setNotification.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange (value, field) {
    let obj = {};
    obj[field] = value;
    this.setState(obj);
  }

  setNotification () {
    let {hr, min, email, phone} = this.state;
    let minSeconds = (hr * 3600) + (min * 60);
    Meteor.call('setNotification', this.props.fromPlaceId, this.props.toPlaceId, minSeconds, email, phone);
    
  }

  render () {
    //TODO: add validation
    return (
      <Form size='big'>
        <Form.Group>
          <Form.Field width={16}>
            <label>From</label>
            <Autocomplete
              placeholder='Enter starting location'
              onPlaceSelected={this.props.onSelectFrom}
              types={['establishment', 'geocode']} /> {/*autocomplete places and addresses*/}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={16}>
            <label>To</label>
            <Autocomplete
              placeholder='Enter destination location'
              onPlaceSelected={this.props.onSelectTo}
              types={['establishment', 'geocode']} />
          </Form.Field>
        </Form.Group>
        <p>Alert me when time is below...</p>
        <Form.Group>
          <Form.Field
            width={6}
            control='Input'
            label='Hr'
            type='number'
            placeholder='0'
            onChange={(e) => this.onChange(e.target.value, 'hr')} />
          <Form.Field
            width={6}
            control='Input'
            label='Min'
            type='number'
            placeholder='0'
            onChange={(e) => this.onChange(e.target.value, 'min')} />
        </Form.Group>
        <p>Alert me by...</p>
        <Form.Group >
          <Form.Field
            control='Input'
            label='Email'
            width={16}
            type='Email'
            placeholder='you@example.com'
            onChange={(e) => this.onChange(e.target.value, 'email')} />
        </Form.Group>
        <Form.Group>
          <Form.Field
            control='Input'
            label='Phone'
            width={16}
            type='text'
            placeholder='(xxx) xxx-xxxx'
            onChange={(e) => this.onChange(e.target.value, 'phone')} />
        </Form.Group>
        {/*type=button to prevent submitting*/}
        <Button type='button' fluid style={{backgroundColor: '#63A651', color: 'white'}} onClick={this.setNotification}>
          Set notification
        </Button>
      </Form>
    )
  }
}

export default MyForm;