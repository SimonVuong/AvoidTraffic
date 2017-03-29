'use strict';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import NotificationForm from './NotificationForm';

class MainLayout extends React.Component {

  constructor (props) {
    super(props);
    //TODO initialize this to something more... friendly
    this.state = {
      fromPlaceId: 'ChIJOwg_06VPwokRYv534QaPC8g', //NYC
      toPlaceId: 'ChIJOwg_06VPwokRYv534QaPC8g'
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
    let src='https://www.google.com/maps/embed/v1/directions?origin=place_id:' + this.state.fromPlaceId + 
    '&destination=place_id:' + this.state.toPlaceId + '&key=AIzaSyCMmu_dSLLqfqhlnGpLyuyQazYaG_m_Qcs';

    return (
        <Grid padded style={{height: 'inherit'}}>
          <Grid.Column width={5}>
            <NotificationForm onSelectFrom={this.onSelectFrom} onSelectTo={this.onSelectTo} />
          </Grid.Column>
          <Grid.Column width={11} style={{padding: 0}}> {/*no padding so map is flush with screen*/}
            {/*TODO 99 percent because 100 creates scrollbar for some reason...*/}
            <iframe width='100%' height='99%' style={{border: 0}} src={src} />
          </Grid.Column>
        </Grid>
      )
  }
  
}

export default MainLayout;