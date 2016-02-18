(function(){
    app.controller("DialogListController", DialogListController);
    
    function DialogListController(){
        var vm = this;
        vm.chapterData = app.Data.Chapter;
            
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
        };
        
        vm.showDialogModal = function (dialog) {
            angular.copy(dialog, vm.dialogModal.dialog);
            $(vm.dialogModal.id).modal();
        }

        vm.saveDialog = function (dialog) {
            var newDialog = {};
            angular.copy(dialog, newDialog);

            newDialog.id = newDialog.id || app.Utils.Guid.newGuid();

            var index = _.findIndex(vm.chapterData.chapter.dialogs, { id: newDialog.id });

            if (index != -1) {
                vm.chapterData.chapter.dialogs[index] = newDialog;
            }
            else {
                vm.chapterData.chapter.dialogs.push(newDialog);
            }

            $(vm.dialogModal.id).modal("hide");
        }
        vm.selectDialog = function (dialog) {
            vm.updateDialogWindowVisible
            angular.copy(dialog, vm.dialogModal.dialog);
        }
        vm.deleteDialog = function (dialog) {
            _.remove(vm.chapterData.chapter.dialogs, { id: dialog.id });
        }
        vm.demoDialog = function (dialog) {

        }
    }
})();