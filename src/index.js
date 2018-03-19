import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import StarWarsPlanets from './planets/planets.container';
import configureStore from './store';
import { startApplication } from './startup';

const store = configureStore();
startApplication(store);

const App = () => (
  <Provider store={store}>
    <StarWarsPlanets />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
