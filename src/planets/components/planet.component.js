import React from 'react';

const SWPlanet = ({ planet, onSelectPlanet }) => (
  <main>
    <p>Name: {planet.name}</p>
    <p>Climate: {planet.climate}</p>
    <p>Terrain: {planet.terrain}</p>
    <p>Population: {planet.population}</p>
    <p>Was featured in {planet.filmsFeatured} films</p>

    <button onClick={onSelectPlanet}>Next</button>
  </main>
);

export default SWPlanet;