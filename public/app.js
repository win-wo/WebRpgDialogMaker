app = angular.module("WebRpgDialogMaker", []);

app.controller("mainController", mainController);

function mainController(){
    var vm = this;
    vm.appName = "WebRpgDialogMaker";
}