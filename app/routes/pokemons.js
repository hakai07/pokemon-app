import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PokemonsRoute extends Route {
    @service('pokemons') pokemonService;

    queryParams = {
        offset:{
            refreshModel:true
        }
    };

    async model(params) {
        let offset = this.pokemonService.currentOffset || params.offset;
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=" +(offset || 0));
        response = await response.json();
        let pokemonDetails = response.results;
        pokemonDetails.forEach((pokemon) => {
            let urlComponents = pokemon.url.split("/");
            let pokemonId = urlComponents[urlComponents.length - 2];
            pokemon.id = pokemonId;
            pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        });
        this.pokemonService.setPokemons(pokemonDetails);
        return response;
    }
}
