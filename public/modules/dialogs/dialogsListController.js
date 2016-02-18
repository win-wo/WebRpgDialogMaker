(function () {
    app.controller("DialogListController", DialogListController);

    function DialogListController() {
        var vm = this;
        vm.chapterData = app.Data.Chapter;
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
            newMessage: {}
        };

        var dialogRepo = new app.Utils.Repo(vm.chapterData.chapter.dialogs);
        var messageRepo = null;
        
        //dialog
        vm.showDialogModal = function (dialogVm) {
            vm.dialogModal.dialog = new app.Models.Dialog(dialogVm);
            messageRepo = new app.Utils.Repo(vm.dialogModal.dialog.messages);
            $(vm.dialogModal.id).modal();
        }
        vm.saveDialog = function (dialogVm) {
            var dialog = new app.Models.Dialog(dialogVm);
            dialogRepo.save(dialog);
            vm.dialogModal.dialog = {};
            $(vm.dialogModal.id).modal("hide");
        }
        vm.duplicateDialog = function (dialogVm) {
            var dialog = new app.Models.Dialog(dialogVm);
            dialogRepo.duplicate(dialog)
        }
        vm.moveUpDialog = function (dialogVm) {
            var dialog = new app.Models.Dialog(dialogVm);
            dialogRepo.moveUp(dialog);
        }
        vm.moveDownDialog = function (dialogVm) {
            var dialog = new app.Models.Dialog(dialogVm);
            dialogRepo.moveDown(dialog);
        }
        vm.removeDialog = function (dialogVm) {
            var dialog = new app.Models.Dialog(dialogVm);
            dialogRepo.remove(dialog)
        }
        vm.demoDialog = function (dialog) {
            //todo
        }
        
        //messages
        vm.saveMessage = function () {
            var message = new app.Models.Message(vm.dialogModal.dialog.newMessage);
            messageRepo.save(message);
            vm.dialogModal.dialog.newMessage = {};
        }
        vm.selectMessage = function (messageVm) {
            vm.dialogModal.dialog.newMessage = new app.Models.Message(messageVm);
        }
        vm.selectMessageById = function (id) {
            var message = messageRepo.get(id);
            vm.dialogModal.dialog.newMessage = message;
        }
        vm.duplicateMessage = function (messageVm) {
            var message = new app.Models.Message(messageVm);
            messageRepo.duplicate(message);
        }
        vm.moveUpMessage = function (messageVm) {
            var message = new app.Models.Message(messageVm);
            messageRepo.moveUp(message);
        }
        vm.moveDownMessage = function (messageVm) {
            var message = new app.Models.Message(messageVm);
            messageRepo.moveDown(message);
        }
        vm.removeMessage = function (messageVm) {
            var message = new app.Models.Message(messageVm);
            messageRepo.remove(message);
        }
    }
})();