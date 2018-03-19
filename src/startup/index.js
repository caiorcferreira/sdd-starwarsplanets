import { fetchPlanets } from '../planets/planets.requests';
import { selectPlanet } from '../planets/planets.reducer';

export async function startApplication(store) {
  const { dispatch } = store;
  const state = store.getState();

  await fetchPlanets(state, dispatch);

  dispatch(selectPlanet());
}