import { createStore, combineReducers, compose } from "redux";

import planetsReducer from "./planets/planets.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      planets: planetsReducer
    }),
    composeEnhancers()
  );

  return store;
};
