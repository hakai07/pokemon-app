import Route from '@ember/routing/route';

export default class PokemonRoute extends Route {
    async model(params){
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + params.pokemon_id);
        response = await response.json();
        return response;
    }
}

