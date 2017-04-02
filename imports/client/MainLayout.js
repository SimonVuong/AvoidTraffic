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

    let figure;
    if (!this.state.fromPlaceId || !this.state.toPlaceId) {
      figure = (
        <Grid.Column verticalAlign='middle'>
          <Header textAlign='center' style={{fontSize: '4.5em', color: '#FFFFFF', fontWeight: 400}} fontFamily='Raleway'>
            Text me when traffic is better
          </Header>
        </Grid.Column>
      )
    } else {
      let src='https://www.google.com/maps/embed/v1/directions?origin=place_id:' + this.state.fromPlaceId + 
      '&destination=place_id:' + this.state.toPlaceId + '&key=AIzaSyCMmu_dSLLqfqhlnGpLyuyQazYaG_m_Qcs';
      //no border or padding so the map takes up the entire container
      figure = <iframe width='100%' height='100%' style={{border: 0, padding: 0}} src={src} />;
    }

    return (
      <Grid padded style={{height: 'inherit'}}>
        {/*padded so that there's space between edges and grid. get height of root (which gets height
        of body) so that right content can be height of body*/}
        <Grid.Column computer={'4'} tablet={'4'} mobile={'16'}> {/*TODO tie this color to css*/}
          <NotificationForm
            fromPlaceId={this.state.fromPlaceId}
            toPlaceId={this.state.toPlaceId}
            onSelectFrom={this.onSelectForm} 
            onSelectTo={this.onSelectTo}/>
        </Grid.Column>
        {/*no padding so map is flush with screen*/}
        <Grid.Column width={12} only='computer tablet' style={{padding: 0, backgroundImage: 'url("/skySauna.jpg")', backgroundSize: 'cover'}}> 
          {/*margins 0 and height 100% to fill parent column height, then vertically center its column to make
          content centered vertically */}
          <Grid style={{height: '100%', margin: 0}}>
            {figure}
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}

export default MainLayout;