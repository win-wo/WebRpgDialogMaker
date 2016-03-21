import DS from 'ember-data';

export default DS.Model.extend({
    id : DS.attr(),
    character : DS.attr(),
    text : DS.attr(),
    choicesText : DS.attr(),
    choices : DS.attr(),
});
