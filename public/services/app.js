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