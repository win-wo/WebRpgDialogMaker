app.factory('Notifications', function(){
  var Notifications = {};

  Notifications.list = [];

  Notifications.add = function(type, message){
    Notifications.list.push({
        type : type,
        message : message
    });
  };

  return Notifications;
});