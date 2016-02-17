app = angular.module("WebRpgDialogMaker", ["ngRoute"]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/edit', {
                templateUrl: 'public/modules/chapter/index.html',
                controller: 'EditChapterController',
                controllerAs: 'EditChapter'
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
    }
})();