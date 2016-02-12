(function () {
    app.Data.NofiticationRepository = new NofiticationRepository();
    
    function NofiticationRepository(){
        this.notifications = [],
        this.add = function (type, message) {
            debugger;
            this.notifications.push({
                type: type,
                message: message
            });
        },
        this.remove =  function(index) {
            this.notifications.splice();
        }
    }
})();