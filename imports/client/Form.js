'use strict';
import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
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
      phone: '',
      status: null,
      errDetail: null
    }
    this.setAlert = this.setAlert.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectFrom = this.onSelectFrom.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);
  }

  componentDidMount () {
    //TODO FUTURE: when semantic-react is ready, use the new form validation

    $.fn.form.settings.rules.hasFrom = () => {
      return Boolean(this.state.fromText);
    }

    $.fn.form.settings.rules.hasTo = () => {
      return Boolean(this.state.toText);
    }    

    $.fn.form.settings.rules.isNotNegative = function (inputValue) {
      return inputValue >= 0;
    }

    $.fn.form.settings.rules.isPhoneNumber = () => {
      return true;
      return isValidNumber(this.state.phone, 'US'); //TODO FUTURE: add support for other countries
    }

    //TODO FUTURE: add this logic. problem was... how do i remove the error if one becomes non 0
    //can probably use setState((prevState) => {}) but will save for later
    // $.fn.form.settings.rules.hrsAndMinsBothNotZero = () => {
    //   return (this.state.hr != 0 && this.state.min != 0)
    // }

    $('.ui.form').form({
      fields: {
        from: {
          identifier: 'from',
          rules: [
            {
              type: 'hasFrom',
              prompt: 'Please enter an origin'
            }
          ]
        },
        to: {
          identifier: 'to',
          rules: [
            {
              type: 'hasTo',
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
              prompt: 'Please enter a 10 digit phone number 1234567890  '
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

    let fromDiv = 'div.field:has(input[name="from"])'
    $(fromDiv).removeClass('error');
    $(fromDiv+' div.prompt').remove();
  }

  onSelectTo (place) {
    this.setState({
      toText: place.name + ', ' + place.vicinity
    });
    this.props.onSelectTo(place);

    let toDiv = 'div.field:has(input[name="to"])'
    $(toDiv).removeClass('error');
    $(toDiv+' div.prompt').remove();
  }

  onChange (value, field) {
    this.setState({
      status: null,
      errDetail: null
    })

    //so onChange of from and to don't change state
    if (field === undefined) {
      return;
    }

    let obj = {};
    obj[field] = value;
    this.setState(obj);
  }

  setAlert (e) {
    e.preventDefault();
    if ($('.ui.form').form('is valid')) {
      let {fromText, toText, hr, min, phone} = this.state;
      let minSeconds = (hr * 3600) + (min * 60);

      let callback = (err, res) => {
        if (err) {

          console.log(err.message);
          this.setState({
            status: 'error',
            errDetail: err.details
          })
        } else {
          this.setState({
            status: 'success'
          })
        }
      }
      Meteor.call('setAlert', this.props.fromPlaceId, this.props.toPlaceId, fromText, toText,
        minSeconds, phone, callback);
    }
  }

  render () {
    return (
      <Form
        onSubmit={this.setAlert}
        size='big' 
        error={this.state.status === 'error'}
        success={this.state.status === 'success'}>
        <Form.Group>
          <Form.Field width={16}>
            <label>From</label>
            {/*no args for onChange. onChange to reset this.state.state + this.state.errDetail, not change this.state.from*/}
            <Autocomplete
              placeholder='Enter starting location'
              name = 'from'
              onPlaceSelected={this.onSelectFrom}
              onChange={this.onChange}
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
              onChange={this.onChange}
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
            placeholder='xxxxxxxxxx'
            onChange={(e) => this.onChange(e.target.value, 'phone')} />
        </Form.Group>
        <Button fluid style={{backgroundColor: '#63A651', color: 'white'}}>
          Set notification
        </Button>
        <Message
          success
          header='Alert set!'
          content={'You will get text when traffic gets better. Traffic Alert will stop checking '
          + 'traffic after 1 hour.'} />
        {/*style so invalid form submission doesnt trigger error message*/}
        <Message
          style={this.state.status === 'error' ? {} : {display: 'none'}}
          error
          header='Alert failed to set'
          content={this.state.errDetail} />
      </Form>
    )
  }
}
export default MyForm;