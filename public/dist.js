app = angular.module("WebRpgDialogMaker", ["ngRoute"]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/chapters/manage', {
                templateUrl: 'public/modules/chapters/manageChapter.html',
                controller: 'ManageChapterController',
                controllerAs: 'ManageChapter'
            }).
            otherwise({
                redirectTo: '/chapters/manage'
            });
    }]);

(function () {
    app.controller("AppController", AppController);

    function AppController() {
        var vm = this;
        vm.appName = "Project Chaptr";
    }
})();

//Default namespaces
app.Data = {};
app.Models = {};
app.Utils = {};
app.Models.Chapter = (function () {
    function Chapter(data) {
        if (data) this.DataContructor(data);
        else this.Constructor();
    }
    Chapter.prototype.Constructor = function () {
        this.id = app.Data.Guid.newGuid();
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
        return this.number + "." + this.language + "." + app.Utils.Slug.slugify(this.name) + ".json";
    }
    return Chapter;
})();
(function () {
    app.controller("ManageChapterController", ManageChapterController);
    ManageChapterController.$inject = ["$location"];

    function ManageChapterController($location) {
        var vm = this;
        //dialogs
        vm.chapter = new app.Models.Chapter(getFromStorage());
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
        };
        //export/import
        vm.file = null;
        vm.serializedChapterForExport = null;        
        vm.serializedChapterForVisualisation = null;
        vm.exportedFileName = null;
        //Dialogs
        vm.showDialogModal = function (dialog) {
            angular.copy(dialog, vm.dialogModal.dialog);
            $(vm.dialogModal.id).modal();
        }

        vm.saveDialog = function (dialog) {
            var newDialog = {};
            angular.copy(dialog, newDialog);

            newDialog.id = newDialog.id || app.Utils.Guid.newGuid();

            var index = _.findIndex(vm.chapter.dialogs, { id: newDialog.id });

            if (index != -1) {
                vm.chapter.dialogs[index] = newDialog;
            }
            else {
                vm.chapter.dialogs.push(newDialog);
            }

            $(vm.dialogModal.id).modal("hide");
        }
        vm.selectDialog = function (dialog) {
            vm.updateDialogWindowVisible
            angular.copy(dialog, vm.dialogModal.dialog);
        }
        vm.deleteDialog = function (dialog) {
            _.remove(vm.chapter.dialogs, { id: dialog.id });
        }
        vm.demoDialog = function (dialog) {

        }
        //Import Export
        vm.saveToStorage = function () {
            saveToStorage();
        }
        vm.importChapter = function () {
            try {
                var element = angular.element("#toolbar-file-import")[0];
                if (element.files.length == 0) throw new Error("No file selected");
                var file = element.files[0];
                var reader = new FileReader();

                reader.onload = function (e) {
                    loadDataAsChapter(reader.result);
                };

                reader.readAsText(file);
            } catch (error) {
                app.Data.Notifications.add("danger", "Impossible to import : " + error.message);
            }
        }
        vm.exportChapter = function () {
            try {
                vm.serializedChapterForExport = encodeURIComponent(JSON.stringify(vm.chapter));
                vm.exportedFileName = vm.chapter.getFileName();
            } catch (error) {
                app.Data.Notifications.add("danger", "Error while exporting : " + error.message);
            }
        }
        vm.resetChapter = function(){
            vm.chapter = new app.Models.Chapter();
        }
        vm.updateSerializedChapterForVisualisation = function () {
            vm.serializedChapterForVisualisation = JSON.stringify(vm.chapter, undefined, 2);
        }

        function getFromStorage() {
            try {
                return JSON.parse(localStorage.chapter);
            } catch (error) {
                return null;
            }
        }
        function saveToStorage() {
            localStorage.chapter = JSON.stringify(vm.chapter);
        }
        function loadDataAsChapter(data) {
            try {
                var parsedData = JSON.parse(data);
                var chapter = new app.Models.Chapter(parsedData);

                chapter.isValid();
                vm.chapter = chapter;
                saveToStorage();
            } catch (error) {
                app.Data.Notifications.add("danger", "File is not valid : " + error.message);
            }
        }
    }
})();
app.Data.Notifications = {
    list: [],
    add: function (type, message) {
        this.list.push({
            type: type,
            message: message
        });
    }
};
(function () {
    app.controller("NotificationsController", NotificationsController);
    
    function NotificationsController() {
        var vm = this;

        vm.notifications = app.Data.Notifications.list;
        
        vm.removeNotification = function (index) {
            vm.notifications.splice(index, 1);
        }
    }
})();


app.Utils.Guid = (function () {
    function Guid() { }
    
    Guid.newGuid = function () {
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }
    return Guid;
})();
app.Utils.Slug = (function () {
    function Slug() { }

    Slug.slugify = function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    return Slug;
})();
(function () {
    app.controller("ToolbarController", ToolbarController);
    
    function ToolbarController() {
        var vm = this;
       
    }
})();