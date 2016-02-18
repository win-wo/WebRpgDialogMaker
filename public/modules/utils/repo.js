app.Utils.Repo = (function () {
    function Repo(items) {
        this.items = items;
    }

    Repo.prototype.save = function (entity) {
        var index = _.findIndex(this.items, { id: entity.id });

        if (index != -1) {
            this.items[index] = entity;
        }
        else {
            this.items.push(entity);
        }
    }
    Repo.prototype.duplicate = function (entity) {
        var index = _.findIndex(this.items, { id: entity.id });
        entity.id = app.Utils.Guid.newGuid();
        this.items.splice(index, 0, entity);
    }
    Repo.prototype.remove = function (entity) {
        _.remove(this.items, { id: entity.id });
    }
    Repo.prototype.get = function () {

    }
    Repo.prototype.getAll = function () {

    }
    Repo.prototype.moveUp = function (entity) {
        var index = _.findIndex(this.items, { id: entity.id });
        if (index != 0) {
            var messageToMoveUp = this.items[index];
            var messageToMoveDown = this.items[index - 1]

            this.items[index] = messageToMoveDown;
            this.items[index - 1] = messageToMoveUp;
        }

    }
    Repo.prototype.moveDown = function (entity) {
        var index = _.findIndex(this.items, { id: entity.id });
        if (index != this.items.length - 1) {
            var messageToMoveDown = this.items[index]
            var messageToMoveUp = this.items[index + 1];

            this.items[index] = messageToMoveUp;
            this.items[index + 1] = messageToMoveDown;
        }
    }
    return Repo;
})();