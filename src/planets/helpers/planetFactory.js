export default function(planets) {
  return planets
    .map(planet => ({
      name: planet.name,
      climate: planet.climate,
      terrain: planet.terrain,
      population: planet.population,
      filmsFeatured: planet.films.length
    }));
}