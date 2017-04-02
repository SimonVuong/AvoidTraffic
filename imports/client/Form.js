'use strict';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { isValidNumber } from 'libphonenumber-js'
import Autocomplete from 'react-google-autocomplete';


class MyForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fromText: '',
      toText: '',
      hr: 1,
      min: 0,
      phone: ''
    }
    this.setAlert = this.setAlert.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectFrom = this.onSelectFrom.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);
  }

  componentDidMount () {
    $.fn.form.settings.rules.isNotNegative = function (inputValue) {
      console.log(inputValue);
      return inputValue >= 0;
    }

    $.fn.form.settings.rules.isPhoneNumber = () => {
      return isValidNumber(this.state.phone, 'US'); //TODO FUTURE: add support for other countries
    }

    //TODO FUTURE: add this logic. problem was... how do i remove the error if one becomes non 0?
    // $.fn.form.settings.rules.hrsAndMinsBothNotZero = () => {
    //   return (this.state.hr != 0 && this.state.min != 0)
    // }

    $('.ui.form').form({
      fields: {
        from: {
          identifier: 'from',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter an origin'
            }
          ]
        },
        to: {
          identifier: 'to',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a destination'
            }
          ]
        },
        hr: {
          identifier: 'hr',
          rules: [
            // {
            //   type: 'hrsAndMinsBothNotZero',
            //   prompt: 'Hr and min cannot both be zero. Please change hr or min to 1 or higher.'
            // },
            {
              type: 'isNotNegative',
              prompt: 'Please enter a number 0 or higher'
            }
          ]
        },
        min: {
          identifier: 'min',
          rules: [
            // {
            //   type: 'hrsAndMinsBothNotZero',
            //   prompt: 'Hr and min cannot both be zero. Please change hr or min to 1 or higher.'
            // },
            {
              type: 'isNotNegative',
              prompt: 'Please enter a number 0 or higher'
            }
          ]
        },
        phone: {
          identifier: 'phone',
          rules: [
            {
              type: 'isPhoneNumber',
              prompt: 'Please enter a valid phone number'
            }
          ]
        }
      },
      inline: true
    });
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

  setAlert (e) {
    e.preventDefault();
    if ($('.ui.form').form('is valid')) {
      let {fromText, toText, hr, min, phone} = this.state;
      let minSeconds = (hr * 3600) + (min * 60);
      Meteor.call('setAlert', this.props.fromPlaceId, this.props.toPlaceId, fromText, toText, minSeconds, phone);
    }
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
              name = 'from'
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
              name = 'to'
              onPlaceSelected={this.onSelectTo}
              onChange={(e) => this.onChange(e.target.value, 'toText')}
              types={['establishment', 'geocode']} />
          </Form.Field>
        </Form.Group>
        <p>Text me when time is below...</p>
        <Form.Group>
          <Form.Field
            width={8}
            control='Input'
            name = 'hr'
            label='Hr'
            type='number'
            value={this.state.hr}
            onChange={(e) => this.onChange(e.target.value, 'hr')} />
          <Form.Field
            width={8}
            control='Input'
            name = 'min'
            label='Min'
            type='number'
            value={this.state.min}
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
            name = 'phone'
            width={16}
            type='text'
            placeholder='xxx-xxx-xxxx'
            onChange={(e) => this.onChange(e.target.value, 'phone')} />
        </Form.Group>
        {/*type=button to prevent submitting*/}
        <Button fluid style={{backgroundColor: '#63A651', color: 'white'}} onClick={this.setAlert}>
          Set notification
        </Button>
      </Form>
    )
  }
}

export default MyForm;