import { renderPokemonStats } from './render-utils.js';

// Get query param from URI
const params = new URLSearchParams(window.location.search)
const name = params.get('pokemon');

const pokemonCard = document.querySelector('#pokemon-detail');
const pokemonTitle = pokemonCard.querySelector('#pokemon-detail-title');
const pokemonImgFront = pokemonCard.querySelector('#pokemon-detail-img-front');
const pokemonImgBack = pokemonCard.querySelector('#pokemon-detail-img-back');

// Fetch pokemon description by name
axios({
  url: `https://pokeapi.co/api/v2/pokemon/${name}`
})
  .then(pokemon => {
    pokemonTitle.innerHTML = name;
    pokemonImgFront.src = pokemon.data.sprites.front_default;
    pokemonImgBack.src = pokemon.data.sprites.back_default;

    renderPokemonStats(pokemonCard, pokemon.data);
  })