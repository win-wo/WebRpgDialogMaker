(function () {
    app.controller("ManageChapterController", ManageChapterController);
    ManageChapterController.$inject = ["$location"];

    function ManageChapterController($location) {
        var vm = this;
        //dialogs
        vm.chapterData = app.Data.Chapter;
        vm.chapterData.chapter = new app.Models.Chapter(getFromStorage());
        
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
                app.Data.Notifications.add("danger", "Impossible to import : " + error.message);
            }
        }
        vm.exportChapter = function () {
            try {
                vm.serializedChapterForExport = encodeURIComponent(JSON.stringify(vm.chapterData.chapter));
                vm.exportedFileName = vm.chapterData.chapter.getFileName();
            } catch (error) {
                app.Data.Notifications.add("danger", "Error while exporting : " + error.message);
            }
        }
        vm.resetChapter = function(){
            vm.chapterData.chapter = new app.Models.Chapter();
        }
        vm.updateSerializedChapterForVisualisation = function () {
            vm.serializedChapterForVisualisation = JSON.stringify(vm.chapterData.chapter, undefined, 2);
        }

        function getFromStorage() {
            try {
                return JSON.parse(localStorage.chapter);
            } catch (error) {
                return null;
            }
        }
        function saveToStorage() {
            localStorage.chapter = JSON.stringify(vm.chapterData.chapter);
        }
        function loadDataAsChapter(data) {
            try {
                var parsedData = JSON.parse(data);
                var chapter = new app.Models.Chapter(parsedData);

                chapter.isValid();
                vm.chapterData.chapter = chapter;
                saveToStorage();
            } catch (error) {
                app.Data.Notifications.add("danger", "File is not valid : " + error.message);
            }
        }
    }
})();