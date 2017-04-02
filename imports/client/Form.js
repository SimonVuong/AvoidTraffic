'use strict';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';


class MyForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fromText: '',
      toText: '',
      hr: '',
      min: '',
      phone: ''
    }
    this.setAlert = this.setAlert.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectFrom = this.onSelectFrom.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);
  }

  onSelectFrom (place) {
    this.setState({
      fromText: place.name + ', ' + place.vicinity
    });
    this.props.onSelectFrom(place);
  }

  onSelectTo (place) {
    this.setState({
      toText: place.name + ', ' + place.vicinity
    });
    this.props.onSelectTo(place);
  }

  onChange (value, field) {
    let obj = {};
    obj[field] = value;
    this.setState(obj);
  }

  setAlert () {
    let {fromText, toText, hr, min, phone} = this.state;
    let minSeconds = (hr * 3600) + (min * 60);
    Meteor.call('setAlert', this.props.fromPlaceId, this.props.toPlaceId, fromText, toText, minSeconds, phone);
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
              onPlaceSelected={this.onSelectFrom}
              onChange={(e) => this.onChange(e.target.value, 'fromText')}
              types={['establishment', 'geocode']} /> {/*autocomplete places and addresses*/}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={16}>
            <label>To</label>
            <Autocomplete
              placeholder='Enter destination location'
              onPlaceSelected={this.onSelectTo}
              onChange={(e) => this.onChange(e.target.value, 'toText')}
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
        {/*<Form.Group >
          <Form.Field
            control='Input'
            label='Email'
            width={16}
            type='Email'
            placeholder='you@example.com'
            onChange={(e) => this.onChange(e.target.value, 'email')} />
        </Form.Group>*/}
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
        <Button type='button' fluid style={{backgroundColor: '#63A651', color: 'white'}} onClick={this.setAlert}>
          Set notification
        </Button>
      </Form>
    )
  }
}

export default MyForm;