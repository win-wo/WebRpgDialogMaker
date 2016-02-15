app = angular.module("WebRpgDialogMaker", ["ngRoute"]);
app.Data = {};
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/edit', {
                templateUrl: 'public/services/edit/index.html',
                controller: 'EditPageController',
                controllerAs: 'EditPage'
            }).
            otherwise({
                redirectTo: '/edit'
            });
    }]);

(function () {
    app.controller("AppController", AppController);

    function AppController() {
        var vm = this;
        vm.appName = "Project Chaptr";
        
        vm.chapter
    }
})();
(function () {
    app.Data.NofiticationRepository = new NofiticationRepository();
    
    function NofiticationRepository(){
        this.notifications = [],
        this.add = function (type, message) {
            this.notifications.push({
                type: type,
                message: message
            });
        },
        this.remove =  function(index) {
            this.notifications.splice();
        }
    }
})();
(function () {
    app.controller("EditPageController", EditPageController);
    EditPageController.$inject = ["$location"];
    
    function EditPageController($location) {
        var vm = this;
        //dialogs
        vm.chapter = getFromStorage() || {
            id : null,
            name : null,
            number : null,
            language : null,
            dialogs : []
        };
        vm.dialogModal = {
            id : "#dialogModal",
            dialog : {},
        };
        //export/import
        vm.file = null;
        vm.exportedData = null;
        
        vm.showDialogModal = function(dialog){
            angular.copy(dialog, vm.dialogModal.dialog);
            $(vm.dialogModal.id).modal();
        }
        
        vm.saveDialog = function(dialog){    
            var newDialog = {};
            angular.copy(dialog, newDialog);
                    
            newDialog.id = newDialog.id || generateGuid();
            
            var index = _.findIndex(vm.chapter.dialogs, {id : newDialog.id});
            
            if(index != -1){
                vm.chapter.dialogs[index] = newDialog;    
            }
            else{
                vm.chapter.dialogs.push(newDialog);
            }
            
            $(vm.dialogModal.id).modal("hide");
        }
        vm.selectDialog = function(dialog){
            vm.updateDialogWindowVisible
            angular.copy(dialog, vm.dialogModal.dialog);
        }
        vm.deleteDialog = function(dialog){
            _.remove(vm.chapter.dialogs, {id : dialog.id});
        }
        vm.demoDialog = function(dialog){
            
        }
        vm.saveToStorage = function(){
            saveToStorage();
        }
        vm.importData = function () {
            var element = angular.element("#toolbar-file-import")[0];
            var file = element.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                loadDataAsChapter(reader.result);
            };

            reader.readAsText(file);
        }
        vm.exportData = function () {
            try {
                if (localStorage.chapter) {
                    vm.exportedData = encodeURIComponent(JSON.stringify(localStorage.chapter));
                }
            } catch (error) {
                app.Data.NofiticationRepository.add("danger", "No chapter to export");
            }
        }
        vm.updateChapterJson = function(){
            vm.chapterJson = JSON.stringify(vm.chapter, undefined, 2);
        }
        
        function generateGuid(){
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            return guid;
        }
        function getFromStorage(){
            try {
                return JSON.parse(localStorage.chapter);    
            } catch (error) {
                return null;   
            }
        }
        function saveToStorage(){
            localStorage.chapter = JSON.stringify(vm.chapter);
        }
        function loadDataAsChapter(data) {
            try {
                var chapter = JSON.parse(data);

                isChapterValid(chapter);
                localStorage.chapter = data;
                
            } catch (error) {
                app.Data.NofiticationRepository.add("danger", "Data is not readable or invalid");
            }
        }
        function isChapterValid(chapter) {
            if (!chapter) throw new Error("Chapter is null");
            if (!chapter.id) throw new Error("Missing id");
            if (!chapter.name) throw new Error("Missing name");
            if (!chapter.number) throw new Error("Missing number");
            if (!chapter.language) throw new Error("Missing language");
            if (!chapter.dialogs) throw new Error("Missing dialogs");
        }
    }
})();
(function () {
    app.controller("ToolbarController", ToolbarController);
    
    function ToolbarController() {
        var vm = this;
       
    }
})();
(function () {
    app.controller("NotificationsController", NotificationsController);

    function NotificationsController() {
        var vm = this;

        vm.notifications = app.Data.NofiticationRepository.notifications;
        // app.Data.NofiticationRepository.add("success", "YEAH");
        vm.removeNotification = function (index) {
            app.Data.NofiticationRepository.remove(index);
        }
    }
})();

