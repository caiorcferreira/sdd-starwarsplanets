import { connect } from 'react-redux';

import PlanetsComponent from './planets.component';
import { selectPlanet } from './planets.reducer';
import { retryFetchPlanets } from './planets.requests';

function mapStateToProps(state) {
  return { 
    state,
    planets: state.planets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectPlanet: () => dispatch(selectPlanet())
  };
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    onRetryFetchPlanets: () => retryFetchPlanets(stateProps.state, dispatchProps.dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanetsComponent);