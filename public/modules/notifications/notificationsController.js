(function () {
    app.controller("NotificationsController", NotificationsController);
    NotificationsController.$inject = ["NotificationsRepository"]
    function NotificationsController(NotificationsRepository) {
        var vm = this;

        vm.notifications = NotificationsRepository.list;
        
        vm.removeNotification = function (index) {
            vm.notifications.splice(index, 1);
        }
    }
})();

