var Ember;

export default class Repo{
    constructor(items){
        this.items = items;
    }
    addOrUpdate(entity) {
        var entityToSave = JSON.parse(JSON.stringify(entity));
        
        var index = this.getIndex(entityToSave.id);
        if (index !== -1) {
            this.items[index] = entityToSave;
        }
        else {
            entityToSave.id = Repo.guid();
            this.items.push(entityToSave);
        }
        return entityToSave;
    }
    duplicate(entity) {
        var duplicateEntity = Ember.copy(entity);
        var index = this.getIndex(entity.id);
        Ember.set(duplicateEntity, "id", Repo.guid());
        this.items.splice(index, 0, duplicateEntity);
    }
    remove(entity) {
        _.remove(this.items, { id: entity.id });
    }
    clear() {
        this.items = [];
    }
    get(id) {
        return _.find(this.items, { id: id });
    }
    getIndex(id) {
        return _.findIndex(this.items, { id: id });
    }
    getAll() {
        return this.items;
    }
    moveUp(entity) {
        var index = this.getIndex(entity.id);
        if (index !== 0) {
            var messageToMoveUp = this.items[index];
            var messageToMoveDown = this.items[index - 1];

            this.items[index] = messageToMoveDown;
            this.items[index - 1] = messageToMoveUp;
        }

    }
    moveDown(entity) {
        var index = this.getIndex(entity.id);
        if (index !== this.items.length - 1) {
            var messageToMoveDown = this.items[index];
            var messageToMoveUp = this.items[index + 1];

            this.items[index] = messageToMoveUp;
            this.items[index + 1] = messageToMoveDown;
        }
    }
    static guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}