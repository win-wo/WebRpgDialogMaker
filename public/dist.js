app = angular.module("WebRpgDialogMaker", ["ngRoute"]);
app.Data = {};
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/manage', {
                templateUrl: 'public/services/manage/index.html',
                controller: 'ManagePageController',
                controllerAs: 'ManagePage'
            }).
            when('/edit/', {
                templateUrl: 'public/services/edit/index.html',
                controller: 'EditPageController',
                controllerAs: 'EditPage'
            }).
            when('/demo/:dialogId', {
                templateUrl: 'public/services/demo/index.html',
                controller: 'DemoPageController',
                controllerAs: 'DemoPage'
            }).
            otherwise({
                redirectTo: '/manage'
            });
    }]);

(function () {
    app.controller("AppController", AppController);

    AppController.$inject = ["NofiticationRepository"];    
    function AppController(nofiticationRepository) {
        var vm = this;
        vm.appName = "Project Chaptr";
        debugger;
        vm.notifications = nofiticationRepository.notifications;
        
        vm.removeNotification = function(index){
            nofiticationRepository.remove(index);
        }
    }
})();
(function () {
    app.factory("NofiticationRepository", function () {
        return {
            notifications: [],
            add: function (type, message) {
                debugger;
                this.notifications.push({
                    type: type,
                    message: message
                });
            },
            remove : function(index) {
                this.notifications.splice();
            }
        }
    });
})();
(function () {
    app.controller("DemoPageController", DemoPageController);

    function DemoPageController() {
        var vm = this;
    }
})();
(function () {
    app.controller("EditPageController", EditPageController);
    EditPageController.$inject = ["$location","DialogModel"];
    
    function EditPageController($location, DialogModel) {
        var vm = this;
        vm.newDialog = {};
        
        vm.chapter = getFromStorage() || {
            id : null,
            name : null,
            number : null,
            language : null,
            dialogs : []
        };
        
        vm.addNewDialog = function(){
            var dialog = new DialogModel();
            
            dialog.id = generateGuid();
            dialog.name = vm.newDialog.name;
            dialog.number = vm.newDialog.number;
            dialog.language = vm.newDialog.language;
            
            vm.chapter.dialogs.push(dialog);
            vm.newDialog = {};
        }   
             
        vm.saveDialog = function(){
            var dialog = new DialogModel();
            
            dialog.id = vm.newDialog.id;
            dialog.name = vm.newDialog.name;
            dialog.number = vm.newDialog.number;
            dialog.language = vm.newDialog.language;
            
            var index = _.findIndex(vm.chapter.dialogs, {id : dialog.id});
            if(index != -1){
                vm.chapter.dialogs[index] = dialog;    
            }
        }
        
        vm.selectDialog = function(dialog){
            vm.newDialog = dialog;
        }
        vm.deleteDialog = function(dialog){
            _.remove(vm.chapter.dialogs, {id : dialog.id});
        }
        vm.runDialog = function(dialog){
            $location.path("/demo/" + dialog.id);
        }
        vm.saveToStorage = function(){
            saveToStorage();
        }
        
        function generateGuid(){
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            return guid;
        }
        
        function getFromStorage(){
            return JSON.parse(localStorage.chapter);
        }
        
        function saveToStorage(){
            localStorage.chapter = JSON.stringify(vm.chapter);
        }
    }
})();
(function () {
    app.controller("ManagePageController", ManagePageController);
    ManagePageController.$inject = ["NofiticationRepository"];
    
    function ManagePageController(nofiticationRepository) {
        var vm = this;
        vm.file = null;
        vm.exportedData = null;

        vm.importData = function () {
            var element = angular.element("#manage-page-file-import")[0];
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
                nofiticationRepository.add("danger", "No chapter to export");
            }
        }

        function loadDataAsChapter(data) {
            try {
                var chapter = JSON.parse(data);

                isChapterValid(chapter);
                localStorage.chapter = data;
                
            } catch (error) {
                nofiticationRepository.add("danger", "Data is not readable or invalid");
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
    app.factory("DialogModel", function () { return DialogModel })

    function DialogModel() {
        this.id = null;
        this.name = null;
        this.number = null;
        this.language = null;
    }
})();