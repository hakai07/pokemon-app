import Route from '@ember/routing/route';

export default class PokemonsRoute extends Route {
    async model() {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=1");
        response = await response.json();
        let pokemonDetails = response.results;
        pokemonDetails.forEach((pokemon) => {
            let urlComponents = pokemon.url.split("/");
            let pokemonId = urlComponents[urlComponents.length - 2];
            pokemon.id = pokemonId;
            pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        });
        return pokemonDetails;
    }
}
