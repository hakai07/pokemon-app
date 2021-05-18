import Component from "@glimmer/component";

export default class PokemonDetails extends Component{

    get pokemon(){
        let response = this.args.model;
        let pokemonObject = {};
        pokemonObject.abilities = this.getAbilities(response);
        pokemonObject.stats = this.getStats(response);
        pokemonObject.name = response.name;
        pokemonObject.imageUrl = this.getImageUrl(response);
        return pokemonObject;
    }
    
    getAbilities(response){
        let abilities = [];
        response.abilities.forEach((ability) => {
            abilities.push(ability.ability.name);
        });
        return abilities;
    }

    getStats(response){
        let statsMap = {};
        response.stats.forEach((stat) => {
            statsMap[this.getDisplayableStatName(stat.stat.name)] = stat.base_stat;
        });
        return statsMap;
    }

    getDisplayableStatName(statName){
        switch(statName){
            case "hp":
                return "H.P";
            case "special-attack":
                return "Spl-Attack";
            case "special-defense":
                return "Spl-Defense";
            default:
                return statName;
        }
    }

    getImageUrl(response){
        return response.sprites.front_default;
    }
}