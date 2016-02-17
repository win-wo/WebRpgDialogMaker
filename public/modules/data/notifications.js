app.Data.Notifications = {
    data: [],
    add: function (type, message) {
        this.list.push({
            type: type,
            message: message
        });
    }
};