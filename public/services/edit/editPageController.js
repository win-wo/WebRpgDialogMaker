(function () {
    app.controller("EditPageController", EditPageController);
    EditPageController.$inject = ["$location", "Notifications"];

    function EditPageController($location, Notifications) {
        var vm = this;
        //dialogs
        vm.chapter = getFromStorage() || {
            id: generateGuid(),
            name: null,
            number: null,
            language: null,
            dialogs: []
        };
        vm.dialogModal = {
            id: "#dialogModal",
            dialog: {},
        };
        //export/import
        vm.file = null;
        vm.exportedData = null;        
        
        //Dialogs
        vm.showDialogModal = function (dialog) {
            angular.copy(dialog, vm.dialogModal.dialog);
            $(vm.dialogModal.id).modal();
        }

        vm.saveDialog = function (dialog) {
            var newDialog = {};
            angular.copy(dialog, newDialog);

            newDialog.id = newDialog.id || generateGuid();

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
        vm.importData = function () {
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
                Notifications.add("danger", "Impossible to import : " + error.message);
            }
        }
        vm.exportData = function () {
            try {
                if (localStorage.chapter) {
                    vm.exportedData = encodeURIComponent(JSON.stringify(localStorage.chapter));
                }
            } catch (error) {
                Notifications.add("danger", "Impossible to export, please save your data first");
            }
        }
        vm.updateChapterJson = function () {
            vm.chapterJson = JSON.stringify(vm.chapter, undefined, 2);
        }

        function generateGuid() {
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return guid;
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
                var chapter = JSON.parse(JSON.parse(data));

                isChapterValid(chapter);
                localStorage.chapter = data;
            } catch (error) {
                Notifications.add("danger", "File is not valid : " + error.message);
            }
        }
        function isChapterValid(chapter) {
            if (!chapter) throw new Error("Chapter is null");
            if (!chapter.id) throw new Error("Missing id");
            if (!chapter.name) throw new Error("Missing name");
            if (!chapter.number) throw new Error("Missing number");
            if (!chapter.language) throw new Error("Missing language");
            if (!chapter.dialogs) throw new Error("Missing dialogs");
        }
    }
})();