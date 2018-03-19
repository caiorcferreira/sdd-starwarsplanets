import axios from 'axios';

import buildPlanetsFromList from './helpers/planetFactory';
import { 
  fetchPlanetsBegin,
  fetchPlanetsSucceded,
  fetchPlanetsFailed,
  selectPlanet,
  retryFetchPlanets as retryFetchPlanetsActionCreator
} from './planets.reducer';

export async function retryFetchPlanets(state, dispatch) {
  // error=false;
  dispatch(retryFetchPlanetsActionCreator());
  await fetchPlanets(state, dispatch);
  dispatch(selectPlanet());
}

export async function fetchPlanets(state, dispatch) {
  try {
    dispatch(fetchPlanetsBegin());
    const planetList = await planetListFromPagination();
    const planets = buildPlanetsFromList(planetList);
    dispatch(fetchPlanetsSucceded(planets));
  } catch (error) {
    dispatch(fetchPlanetsFailed(error));
  }
}

// var error = true;

async function planetListFromPagination() {
  const MAX_PAGE = 7;
  let planetsResults = [];

  // if (error) {
  //   throw Error('BLA');
  // }

  for (let page = 1; page <= MAX_PAGE; page++) {
    const { data } = await axios(createFetchPlanetsRequest(page));
    const { results } = data;

    planetsResults.push(results);
  }

  return [].concat.apply([], planetsResults);
}

export function createFetchPlanetsRequest(page=0) {
  const requestUrl = `https://swapi.co/api/planets/${page > 0 ? `?page=${page}` : ''}`;
  return {
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}