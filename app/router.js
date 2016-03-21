import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("dialog", {path : "dialog"}, function(){
        this.route("add", {path : "add"});
        this.route("view", {path : "view/:id"});
    });
});

export default Router;