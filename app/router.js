import EmberRouter from '@ember/routing/router';
import config from 'pokemon-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('pokemons',{path : '/'});
  this.route('pokemon',{path: 'pokemon/:pokemon_id'});
});
