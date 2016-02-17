(function () {
    app.controller("ManageChapterController", ManageChapterController);
    ManageChapterController.$inject = ["$location", "Chapter","NotificationsRepository", "Guid"];

    function ManageChapterController($location, Chapter, NotificationsRepository, Guid) {
        var vm = this;
        //dialogs
        vm.chapter = new Chapter(getFromStorage());
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
        };
        //export/import
        vm.file = null;
        vm.serializedChapterForExport = null;        
        vm.serializedChapterForVisualisation = null;
        vm.exportedFileName = null;
        //Dialogs
        vm.showDialogModal = function (dialog) {
            angular.copy(dialog, vm.dialogModal.dialog);
            $(vm.dialogModal.id).modal();
        }

        vm.saveDialog = function (dialog) {
            var newDialog = {};
            angular.copy(dialog, newDialog);

            newDialog.id = newDialog.id || Guid.newGuid();

            var index = _.findIndex(vm.chapter.dialogs, { id: newDialog.id });

            if (index != -1) {
                vm.chapter.dialogs[index] = newDialog;
            }
            else {
                vm.chapter.dialogs.push(newDialog);
            }

            $(vm.dialogModal.id).modal("hide");
        }
        vm.selectDialog = function (dialog) {
            vm.updateDialogWindowVisible
            angular.copy(dialog, vm.dialogModal.dialog);
        }
        vm.deleteDialog = function (dialog) {
            _.remove(vm.chapter.dialogs, { id: dialog.id });
        }
        vm.demoDialog = function (dialog) {

        }
        //Import Export
        vm.saveToStorage = function () {
            saveToStorage();
        }
        vm.importChapter = function () {
            try {
                var element = angular.element("#toolbar-file-import")[0];
                if (element.files.length == 0) throw new Error("No file selected");
                var file = element.files[0];
                var reader = new FileReader();

                reader.onload = function (e) {
                    loadDataAsChapter(reader.result);
                };

                reader.readAsText(file);
            } catch (error) {
                NotificationsRepository.add("danger", "Impossible to import : " + error.message);
            }
        }
        vm.exportChapter = function () {
            try {
                vm.serializedChapterForExport = encodeURIComponent(JSON.stringify(vm.chapter));
                vm.exportedFileName = vm.chapter.getFileName();
            } catch (error) {
                NotificationsRepository.add("danger", "Error while exporting : " + error.message);
            }
        }
        vm.resetChapter = function(){
            vm.chapter = new Chapter();
        }
        vm.updateSerializedChapterForVisualisation = function () {
            vm.serializedChapterForVisualisation = JSON.stringify(vm.chapter, undefined, 2);
        }

        function getFromStorage() {
            try {
                return JSON.parse(localStorage.chapter);
            } catch (error) {
                return null;
            }
        }
        function saveToStorage() {
            localStorage.chapter = JSON.stringify(vm.chapter);
        }
        function loadDataAsChapter(data) {
            try {
                var parsedData = JSON.parse(data);
                var chapter = new Chapter(parsedData);

                chapter.isValid();
                vm.chapter = chapter;
                saveToStorage();
            } catch (error) {
                NotificationsRepository.add("danger", "File is not valid : " + error.message);
            }
        }
    }
})();