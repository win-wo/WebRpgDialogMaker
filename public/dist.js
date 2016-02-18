app = angular.module("WebRpgDialogMaker", ["ngRoute"]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/chapter', {
                templateUrl: 'public/modules/chapters/index.html',
                controller: 'ChapterPageController',
                controllerAs: 'ChapterPage'
            }).
            otherwise({
                redirectTo: '/chapter'
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
        this.id = app.Utils.Guid.newGuid();
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
    app.controller("ChapterPageController", ChapterPageController);
    ChapterPageController.$inject = ["$location"];

    function ChapterPageController($location) {
        var vm = this;
        //dialogs
        vm.chapterData = app.Data.Chapter;
        vm.chapterData.chapter = new app.Models.Chapter(getFromStorage());
                
        //export/import
        vm.file = null;
        vm.serializedChapterForExport = null;        
        vm.serializedChapterForVisualisation = null;
        vm.exportedFileName = null;
        
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
                vm.serializedChapterForExport = encodeURIComponent(JSON.stringify(vm.chapterData.chapter));
                vm.exportedFileName = vm.chapterData.chapter.getFileName();
            } catch (error) {
                app.Data.Notifications.add("danger", "Error while exporting : " + error.message);
            }
        }
        vm.resetChapter = function(){
            vm.chapterData.chapter = new app.Models.Chapter();
        }
        vm.updateSerializedChapterForVisualisation = function () {
            vm.serializedChapterForVisualisation = JSON.stringify(vm.chapterData.chapter, undefined, 2);
        }

        function getFromStorage() {
            try {
                return JSON.parse(localStorage.chapter);
            } catch (error) {
                return null;
            }
        }
        function saveToStorage() {
            localStorage.chapter = JSON.stringify(vm.chapterData.chapter);
        }
        function loadDataAsChapter(data) {
            try {
                var parsedData = JSON.parse(data);
                var chapter = new app.Models.Chapter(parsedData);

                chapter.isValid();
                vm.chapterData.chapter = chapter;
                saveToStorage();
                location.reload();
            } catch (error) {
                app.Data.Notifications.add("danger", "File is not valid : " + error.message);
            }
        }
    }
})();
app.Data.Chapter = {
    
}
app.Data.Notifications = {
    data: [],
    add: function (type, message) {
        this.list.push({
            type: type,
            message: message
        });
    }
};
app.Models.Dialog = (function(){
    function Dialog(data){
        if (data) this.DataContructor(data);
        else this.Constructor();
    }
    Dialog.prototype.Constructor = function () {
        this.id = app.Utils.Guid.newGuid();
        this.name = null;
        this.number = null;
        this.messages = [];
    }
    Dialog.prototype.DataContructor = function (data) {
        this.id = data.id;
        this.name = data.name;
        this.number = data.number;
        this.messages = data.messages;
    }
    
    return Dialog;
})();
(function(){
    app.controller("DialogListController", DialogListController);
    
    function DialogListController(){
        var vm = this;
        vm.chapterData = app.Data.Chapter;
            
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
        };
        
        vm.showDialogModal = function (dialog) {
            vm.dialogModal.dialog = new app.Models.Dialog(dialog);
            $(vm.dialogModal.id).modal();
        }

        vm.saveDialog = function (dialog) {
            var newDialog = new app.Models.Dialog(dialog);

            var index = _.findIndex(vm.chapterData.chapter.dialogs, { id: newDialog.id });

            if (index != -1) {
                vm.chapterData.chapter.dialogs[index] = newDialog;
            }
            else {
                vm.chapterData.chapter.dialogs.push(newDialog);
            }

            $(vm.dialogModal.id).modal("hide");
        }
        vm.duplicateDialog = function(dialog){
            debugger;
            dialog.id = app.Utils.Guid.newGuid();
            var newDialog = new app.Models.Dialog(dialog);  
            
            var index = _.findIndex(vm.chapterData.chapter.dialogs, { id: newDialog.id }); 
            
            vm.chapterData.chapter.dialogs.splice(index, 0, newDialog);         
        }
        vm.deleteDialog = function (dialog) {
            _.remove(vm.chapterData.chapter.dialogs, { id: dialog.id });
        }
        vm.demoDialog = function (dialog) {

        }
    }
})();
(function () {
    app.controller("NotificationsController", NotificationsController);
    
    function NotificationsController() {
        var vm = this;

        vm.notifications = app.Data.Notifications.data;
        
        vm.removeNotification = function (index) {
            vm.notifications.splice(index, 1);
        }
    }
})();


(function () {
    app.controller("ToolbarController", ToolbarController);
    
    function ToolbarController() {
        var vm = this;
       
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