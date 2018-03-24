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
    const planetList = await getPlanetListFromApi();
    const planets = buildPlanetsFromList(planetList);
    console.log(planets);
    dispatch(fetchPlanetsSucceded(planets));
  } catch (error) {
    dispatch(fetchPlanetsFailed(error));
  }
}

// var error = true;

async function getPlanetListFromApi() {
  const url='https://swapi.co/api/planets/';
  
  return await makePlanetListFromApiPagination(url, []);
}

async function makePlanetListFromApiPagination(nextUrl, list) {
  if (nextUrl === null) {
    return list;
  }
  
  const { data } = await axios(createFetchPlanetsRequest(nextUrl));
  const { results, next } = data;
  
  return makePlanetListFromApiPagination(next, [...list, ...results])
}

export function createFetchPlanetsRequest(url) {
  return {
    method: 'get',
    url,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
