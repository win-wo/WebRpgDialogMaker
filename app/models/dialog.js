import DS from 'ember-data';

export default DS.Model.extend({
  id : DS.attr(),
  name : DS.attr(),
  number : DS.attr(),
  messages : DS.hasMany("message")
});
