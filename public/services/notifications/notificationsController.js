(function () {
    app.controller("NotificationsController", NotificationsController);
    NotificationsController.$inject = ["Notifications"]
    function NotificationsController(Notifications) {
        var vm = this;

        vm.notifications = Notifications.list;
        
        vm.removeNotification = function (index) {
            vm.notifications.splice(index, 1);
        }
    }
})();

