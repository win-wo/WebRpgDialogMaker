(function () {
    app.factory("NofiticationRepository", function () {
        return {
            notifications: [],
            add: function (type, message) {
                debugger;
                this.notifications.push({
                    type: type,
                    message: message
                });
            },
            remove : function(index) {
                this.notifications.splice();
            }
        }
    });
})();