import selectRandomPlanet from './helpers/selectRandomPlanetFromList';

export const actionTypes = {
  FETCH_PLANETS_BEGIN: 'FETCH_PLANETS_BEGIN',
  FETCH_PLANETS_SUCCEDED: 'FETCH_PLANETS_SUCCEDED',
  FETCH_PLANETS_FAILED: 'FETCH_PLANETS_FAILED',
  RETRY_FETCH_PLANETS: 'RETRY_FETCH_PLANETS',
  SELECT_PLANET: 'SELECT_PLANET'
};

export const stateTypes = {
  PLANETS_NOT_REQUESTED: {
    name: 'PLANETS_NOT_REQUESTED',
    availableActions: [actionTypes.FETCH_PLANETS_BEGIN]
  },
  FETCHING_PLANETS: {
    name: 'FETCHING_PLANETS',
    availableActions: [actionTypes.FETCH_PLANETS_SUCCEDED, actionTypes.FETCH_PLANETS_FAILED],
  },
  FETCH_PLANETS_FAILED: {
    name: 'FETCH_PLANETS_FAILED',
    availableActions: [actionTypes.RETRY_FETCH_PLANETS]
  },
  PLANETS_FETCHED: {
    name: 'PLANETS_FETCHED',
    availableActions: [actionTypes.SELECT_PLANET]
  },
  SELECTED_PLANET: {
    name: 'SELECTED_PLANET',
    availableActions: [actionTypes.SELECT_PLANET]
  }
};

const initialState = {
  _stateType: stateTypes.PLANETS_NOT_REQUESTED,
  planets: [],
  selectedPlanet: null,
  loading: false,
  error: null
};

export default function(state = initialState, action = {}) {
  const actionIsAllowed = state._stateType.availableActions.includes(action.type);

  if(!actionIsAllowed) return state;

  switch (action.type) {
    case actionTypes.FETCH_PLANETS_BEGIN:
      return { ...state, _stateType: stateTypes.FETCHING_PLANETS, loading: true };
    case actionTypes.FETCH_PLANETS_SUCCEDED:
      return { 
        ...state,
        _stateType: stateTypes.PLANETS_FETCHED,
        planets: action.payload,
        loading: false,
        error: null, 
      };
    case actionTypes.FETCH_PLANETS_FAILED:
      return  {
        ...state,
        _stateType: stateTypes.FETCH_PLANETS_FAILED,
        error: action.payload,
        loading: false
      };
    case actionTypes.RETRY_FETCH_PLANETS:
      return initialState;
    case actionTypes.SELECT_PLANET:
      return {
        ...state,
        _stateType: stateTypes.SELECTED_PLANET,
        selectedPlanet: selectRandomPlanet(state.planets)
      };
    default:
      return state;
  }
};

export function fetchPlanetsBegin() {
  return {
    type: actionTypes.FETCH_PLANETS_BEGIN
  };
}

export function fetchPlanetsSucceded(planets) {
  return {
    type: actionTypes.FETCH_PLANETS_SUCCEDED,
    payload: planets
  };
}

export function fetchPlanetsFailed(error) {
  return {
    type: actionTypes.FETCH_PLANETS_FAILED,
    payload: error
  };
}

export function retryFetchPlanets() {
  return {
    type: actionTypes.RETRY_FETCH_PLANETS
  };
}

export function selectPlanet() {
  return {
    type: actionTypes.SELECT_PLANET
  };
}
