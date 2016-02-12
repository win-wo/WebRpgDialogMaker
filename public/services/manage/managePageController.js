(function () {
    app.controller("ManagePageController", ManagePageController);
    
    function ManagePageController() {
        var vm = this;
        vm.file = null;
        vm.exportedData = null;

        vm.importData = function () {
            var element = angular.element("#manage-page-file-import")[0];
            var file = element.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                loadDataAsChapter(reader.result);
            };

            reader.readAsText(file);
        }

        vm.exportData = function () {
            try {
                if (localStorage.chapter) {
                    vm.exportedData = encodeURIComponent(JSON.stringify(localStorage.chapter));
                }
            } catch (error) {
                app.Data.NofiticationRepository.add("danger", "No chapter to export");
            }
        }

        function loadDataAsChapter(data) {
            try {
                var chapter = JSON.parse(data);

                isChapterValid(chapter);
                localStorage.chapter = data;
                
            } catch (error) {
                app.Data.NofiticationRepository.add("danger", "Data is not readable or invalid");
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