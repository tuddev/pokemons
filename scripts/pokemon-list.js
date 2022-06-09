import { renderPokemonStats } from './render-utils.js';

/**
 * Axios config for request pokemon list
 */
const AXIOS_POKEMONS_LIST_REQUEST = {
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/pokemon?limit=20',
};

/**
 * Fetch pokemons list from api
 */
function pokemonRequest() {
  let pokemonItems = [];

  // Fetch pokemon data
  axios(AXIOS_POKEMONS_LIST_REQUEST)
    .then(pokemons => {
      pokemonItems = pokemons.data.results;

      // For each pokemon item fetch pokemon description
      Promise.allSettled(pokemonItems.map(item => 
        axios({
          url: `https://pokeapi.co/api/v2/pokemon/${item.name}`
        })
          .then(pokemon => {
            pokemonItems = pokemonItems.map(item => { 
              if (item.name === pokemon.data.name) {
                return { ...item, desc: pokemon.data }
              }

              return item; 
            })
          })
          .catch(console.log)
      ))
        .then(() => {
          render(pokemonItems)
        })
        .catch(console.log)
    })
    .catch(console.log)
}

/**
 * Create new pokemon card and append to HTML 
 */
function createNode(value, index) {
  const pageTemplate = document.querySelector('#page-item-template').cloneNode(true); 
  pageTemplate.id = `${pageTemplate.id}-${index}`; 
  pageTemplate.classList.remove('page__item--template');

  const pageTemplateImg = pageTemplate.querySelector('#list-card-img');
  pageTemplateImg.src = value.desc.sprites.front_default; 
  pageTemplateImg.id = `${pageTemplateImg.id}-${index}`;
  
  const pageTemplateName = pageTemplate.querySelector('#list-card-title');
  pageTemplateName.innerHTML = value.name;
  pageTemplateName.id = `${pageTemplateName.id}-${index}`;

  const link = pageTemplate.querySelector('#button-to-pokemon');
  link.href=`/pokemon.html?pokemon=${value.name}`

  renderPokemonStats(pageTemplate, value.desc)

  document.querySelector('#page-container').append(pageTemplate);
}

/**
 * Render pokemon list from request data
 */
function render(pokemonItems) { 
  pokemonItems.forEach(createNode)
}

pokemonRequest();

 

