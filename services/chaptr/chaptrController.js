(function () {
    app.controller("chaptrController", chaptrController);
    chaptrController.$inject = ["dialogModel"];
    
    function chaptrController(dialogModel) {
        var vm = this;
        vm.chapter = {
            id : "",
            name : "",
            language : "",
            dialogs : [],
        };
        
        vm.loadData = function () {

        }
        vm.refreshData = function () {

        }
        vm.exportData = function () {

        }
        
        function generateGuid(){
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            return guid;
        }
    }
})();