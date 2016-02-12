app = angular.module("WebRpgDialogMaker", ["ngRoute"]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/manage', {
        templateUrl: 'public/services/manage/index.html',
        controller: 'ManagePageController',
        controllerAs : 'ManagePage'
      }).
      when('/edit/', {
        templateUrl: 'public/services/edit/index.html',
        controller: 'EditPageController',
        controllerAs : 'EditPage'
      }).
      when('/demo/:dialogId', {
        templateUrl: 'public/services/demo/index.html',
        controller: 'DemoPageController',
        controllerAs : 'DemoPage'
      }).
      otherwise({
        redirectTo: '/manage'
      });
  }]);
  
(function () {
    app.controller("AppController", AppController);

    function AppController() {
        var vm = this;
        vm.appName = "Project Chaptr";
    }
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
    app.factory("DialogModel", function () { return DialogModel })

    function DialogModel() {
        this.id = null;
        this.name = null;
        this.number = null;
        this.language = null;
    }
})();
(function () {
    app.controller("ManagePageController", ManagePageController);

    function ManagePageController() {
        var vm = this;
        
        vm.importData = function(){
            
        }
        
        vm.exportData = function(){
            
        }
    }
})();