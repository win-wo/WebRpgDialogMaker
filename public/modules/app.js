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