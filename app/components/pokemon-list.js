import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';


export default class PokemonList extends Component{

    @service('pokemons') pokemonService;

    @tracked displayablePokemons;
    @tracked searchValue = "";

    get next(){
        return this.getParameterByName("offset", this.args.model.next);
    }

    get prev(){
        return this.getParameterByName("offset", this.args.model.previous);
    }

    get pokemon(){
        return this.searchValue ? this.displayablePokemons : this.pokemonService.pokemons;
    }

    @action
    updateDisplayablePokemons(e){
        let pokemons = []
        if(e.target.value){
            this.pokemonService.pokemons.forEach((pokemon) => {
                if(pokemon.name.includes(e.target.value))
                    pokemons.push(pokemon);
            });
            this.displayablePokemons = [...pokemons];
        }
        else
            this.displayablePokemons = [...this.pokemonService.pokemons];
    }

    @action
    setoffset(offset){
        this.searchValue = "";
        this.pokemonService.currentOffset = offset;
    }

   
    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}