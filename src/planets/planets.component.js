import React, { Component } from 'react';

import { stateTypes } from './planets.reducer';

import SWPlanet from './components/planet.component';
import ErrorSWPlanet from './components/error.component';

class SWPlanets extends Component {
  render() {
    const props = this.props;
    switch (props.planets._stateType) {
      case stateTypes.FETCHING_PLANETS:
        return (<p>Loading...</p>);
      case stateTypes.FETCH_PLANETS_FAILED:
        return (<ErrorSWPlanet onRetryFetchPlanets={props.onRetryFetchPlanets} />);
      case stateTypes.FETCHED_PLANETS:
        return (<p>Loading...</p>);
      case stateTypes.SELECTED_PLANET:
        const selectedPlanet = props.planets.selectedPlanet;
        return (<SWPlanet planet={selectedPlanet} onSelectPlanet={props.onSelectPlanet} />);
      default:
        return (<ErrorSWPlanet onRetryFetchPlanets={props.onRetryFetchPlanets} />);
    }
  }
}

export default SWPlanets;
