app.Models.Dialog = (function () {
    function Dialog(vm) {
        if (vm) {
            this.id = vm.id;
            this.name = vm.name;
            this.number = vm.number;
            this.messages = vm.messages;
        }
        else {
            this.id = app.Utils.Guid.newGuid();
            this.name = null;
            this.number = null;
            this.messages = [];
        }
    }
    return Dialog;
})();