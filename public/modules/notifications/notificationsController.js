(function () {
    app.controller("NotificationsController", NotificationsController);
    
    function NotificationsController() {
        var vm = this;

        vm.notifications = app.Data.Notifications.list;
        
        vm.removeNotification = function (index) {
            vm.notifications.splice(index, 1);
        }
    }
})();

