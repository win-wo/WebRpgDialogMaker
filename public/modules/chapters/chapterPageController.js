(function () {
    app.controller("ChapterPageController", ChapterPageController);
    ChapterPageController.$inject = ["$location"];

    function ChapterPageController($location) {
        var vm = this;
        //dialogs
        vm.chapterData = app.Data.Chapter;
        vm.chapterData.chapter = new app.Models.Chapter(getFromStorage());
                
        //export/import
        vm.file = null;
        vm.serializedChapterForExport = null;        
        vm.serializedChapterForVisualisation = null;
        vm.exportedFileName = null;
        
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
                location.reload();
            } catch (error) {
                app.Data.Notifications.add("danger", "File is not valid : " + error.message);
            }
        }
    }
})();