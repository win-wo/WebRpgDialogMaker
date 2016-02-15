(function () {
    app.controller("NotificationsController", NotificationsController);

    function NotificationsController() {
        var vm = this;

        vm.notifications = app.Data.NofiticationRepository.notifications;
        app.Data.NofiticationRepository.add("success", "YEAH");
        vm.removeNotification = function (index) {
            app.Data.NofiticationRepository.remove(index);
        }
    }
})();

