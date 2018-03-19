import React from 'react';

const ErrorSWPlanet = ({ onRetryFetchPlanets }) => (
  <main>
    <p>There was an error, please retry.</p>
    <button onClick={onRetryFetchPlanets}>Retry</button>
  </main>
);

export default ErrorSWPlanet;