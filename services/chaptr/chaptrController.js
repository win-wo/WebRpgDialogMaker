(function () {
    app.controller("chaptrController", chaptrController);
    chaptrController.$inject = ["dialogModel"];
    
    function chaptrController(dialogModel) {
        var vm = this;
        vm.data = {
            chapterName : "",
            dialogs : [],
        };
        
        vm.loadData = function () {

        }
        vm.refreshData = function () {

        }
        vm.exportData = function () {

        }
    }
})();