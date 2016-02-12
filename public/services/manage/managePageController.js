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
            vm.exportedData = encodeURIComponent(JSON.stringify(localStorage.chapter));
        }

        function loadDataAsChapter(data) {
            try {
                var parsedData = JSON.parse(data);

                if (!parsedData.id) throw new Error("Missing id");
                if (!parsedData.name) throw new Error("Missing name");
                if (!parsedData.number) throw new Error("Missing number");
                if (!parsedData.language) throw new Error("Missing language");
                if (!parsedData.dialogs) throw new Error("Missing dialogs");

                localStorage.chapter = data;
            } catch (error) {
                console.error("Data is not readable or invalid : " + error.message);
            }
        }
    }
})();