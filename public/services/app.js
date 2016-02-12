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