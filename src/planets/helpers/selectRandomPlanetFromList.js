export default function(planets) {
  const randomId = Math.floor(Math.random() * (planets.length + 1)) ;
  return planets[randomId];
}