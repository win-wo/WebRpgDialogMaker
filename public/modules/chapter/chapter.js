(function () {
    app.factory("Chapter", factory)
    factory.$inject = ["Guid", "Slug"];

    function factory(Guid, Slug) {
        function Chapter(data) {
            if (data) this.DataContructor(data);
            else this.Constructor();
        }
        Chapter.prototype.Constructor = function () {
            this.id = Guid.newGuid();
            this.name = null;
            this.number = null;
            this.language = null;
            this.dialogs = [];
        }
        Chapter.prototype.DataContructor = function (data) {
            this.id = data.id;
            this.name = data.name;
            this.number = data.number;
            this.language = data.language;
            this.dialogs = data.dialogs;
        }
        Chapter.prototype.isValid = function () {
            if (!this.id) throw new Error("Missing id");
            if (!this.name) throw new Error("Missing name");
            if (!this.number) throw new Error("Missing number");
            if (!this.language) throw new Error("Missing language");
            if (!this.dialogs) throw new Error("Missing dialogs");
        }

        Chapter.prototype.getFileName = function () {
            return this.number + "." + this.language + "." + Slug.slugify(this.name) + ".json";
        }
        return Chapter;
    }
})();