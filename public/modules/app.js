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