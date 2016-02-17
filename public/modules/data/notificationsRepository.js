app.factory('NotificationsRepository', function(){
  var NotificationsRepository = {};

  NotificationsRepository.list = [];

  NotificationsRepository.add = function(type, message){
    NotificationsRepository.list.push({
        type : type,
        message : message
    });
  };

  return NotificationsRepository;
});