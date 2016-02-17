app.Data.Notifications = {
    list: [],
    add: function (type, message) {
        this.list.push({
            type: type,
            message: message
        });
    }
};