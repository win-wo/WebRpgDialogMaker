app.factory('NotificationsRepository', function () {
    var NotificationsRepository = {
        list: [],
        add: function (type, message) {
            NotificationsRepository.list.push({
                type: type,
                message: message
            });
        }
    }

    return NotificationsRepository;
});