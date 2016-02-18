app.Models.Message = (function () {
    function Message(vm) {
        if (vm) {
            this.id = vm.id;
            this.character = vm.character;
            this.text = vm.text;
            this.choices = this.parseChoices(vm.choices);
        }
        else {
            this.id = app.Utils.Guid.newGuid();
            this.character = null;
            this.text = null;
            this.choices = null;
            this.character = null;
        }
    }
    
    Message.prototype.parseChoices = function(stringChoices){
        this.choices = {};
    }
    return Message;
})();