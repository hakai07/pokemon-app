import Service from '@ember/service';
import {tracked }from '@glimmer/tracking';

export default class PokemonsService extends Service {
    @tracked pokemons = [];
    @tracked currentOffset;

    setPokemons(item){
        this.pokemons = [...item];
    }
}
