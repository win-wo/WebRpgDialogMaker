(function(){
    app.controller("DialogListController", DialogListController);
    
    function DialogListController(){
        var vm = this;
        vm.chapterData = app.Data.Chapter;
        vm.newMessage = {};
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
        };
        
        vm.showDialogModal = function (dialog) {
            vm.dialogModal.dialog = new app.Models.Dialog(dialog);
            $(vm.dialogModal.id).modal();
        }

        vm.saveDialog = function (dialog) {
            var newDialog = new app.Models.Dialog(dialog);

            var index = _.findIndex(vm.chapterData.chapter.dialogs, { id: newDialog.id });

            if (index != -1) {
                vm.chapterData.chapter.dialogs[index] = newDialog;
            }
            else {
                vm.chapterData.chapter.dialogs.push(newDialog);
            }

            $(vm.dialogModal.id).modal("hide");
        }
        vm.duplicateDialog = function(dialog){
            debugger;
            dialog.id = app.Utils.Guid.newGuid();
            var newDialog = new app.Models.Dialog(dialog);  
            
            var index = _.findIndex(vm.chapterData.chapter.dialogs, { id: newDialog.id }); 
            
            vm.chapterData.chapter.dialogs.splice(index, 0, newDialog);         
        }
        vm.deleteDialog = function (dialog) {
            _.remove(vm.chapterData.chapter.dialogs, { id: dialog.id });
        }
        vm.demoDialog = function (dialog) {

        }
        
        //messages
        vm.copyIdMessage = function(message){
            
        }
        vm.duplicateMessage = function(message){
            
        }
        vm.moveUpMessage = function(message){
            
        }
        vm.moveDownMessage = function(message){
            
        }
    }
})();