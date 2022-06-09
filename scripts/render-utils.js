/**
 * Render pokemon stats in node from pokemonData
 */
export function renderPokemonStats(node, pokemonData) {
  const itemsContainer = node.querySelector('#pokemon-stats-items');
  const listItem = node.querySelector('#pokemon-stats-item');

  for (let i = 0; i < 6; i+=3) {
    const columnItem = node.querySelector('#pokemon-stats-items-col').cloneNode();

    for (let j = 0; j < 3; j++) {
      const clonedListItem = listItem.cloneNode()
      clonedListItem.innerHTML = `${pokemonData.stats[i+j].stat.name}: ${pokemonData.stats[i+j].base_stat}`;
      columnItem.append(clonedListItem)
    }

    itemsContainer.append(columnItem)
  }
}