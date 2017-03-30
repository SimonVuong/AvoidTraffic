'use strict';
import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import NotificationForm from './NotificationForm';

//TODO FUTURE: remove the *inputs* from the map. tried the following
// iframe onLoad (no because load runs before map finishes), jquery on same as previous,
// mutationObserver(no can't detect proper div mount. the ones that get added and detected
//come before the map), componentDidUpdate (no because runsbefore map is rendered)
class MainLayout extends React.Component {

  constructor (props) {
    super(props);
    //TODO initialize this to something more... friendly
    this.state = {
      fromPlaceId: null,
      toPlaceId: null
    }
    this.onSelectForm = this.onSelectForm.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);
  }

  onSelectForm (place) {
    this.setState({
      fromPlaceId: place.place_id
    })
  }

  onSelectTo (place) {
    this.setState({
      toPlaceId: place.place_id
    })
  }

  render () {

    let content;
    if (!this.state.fromPlaceId && !this.state.toPlaceId) {
      content = (
        <Header size='huge' textAlign='center' style={{fontSize: '60px', color: 'white', fontWeight: 400}} fontFamily='Raleway'>
          Receive an alert when traffic decreases below a certain time
        </Header>
      )
    } else {
      let src='https://www.google.com/maps/embed/v1/directions?origin=place_id:' + this.state.fromPlaceId + 
      '&destination=place_id:' + this.state.toPlaceId + '&key=AIzaSyCMmu_dSLLqfqhlnGpLyuyQazYaG_m_Qcs';
      content = <iframe width='100%' height='99%' style={{border: 0}} src={src} />;
    }



    return (
        <Grid padded style={{height: 'inherit'}}>
          <Grid.Column width={4} style={{background: '#f9fcff'}}> {/*TODO tie this color to css*/}
            <NotificationForm onSelectFrom={this.onSelectForm} onSelectTo={this.onSelectTo}/>
          </Grid.Column>
          {/*no padding so map is flush with screen*/}
          <Grid.Column 
            width={12} 
            style={{padding: 0}} 
            style={{backgroundImage: 'url("/skySauna.jpg")', backgroundSize: 'cover'}}> 
            
            {/*figure out how to better center this...*/}
            <Grid stretched style={{height: '100%'}}>
              <Grid.Column verticalAlign='middle'>
                {content}
              </Grid.Column>
            </Grid>
            
            
            
            
          </Grid.Column>
        </Grid>
      )
  }
  
}

export default MainLayout;