app.Models.Dialog = (function(){
    function Dialog(data){
        if (data) this.DataContructor(data);
        else this.Constructor();
    }
    Dialog.prototype.Constructor = function () {
        this.id = app.Utils.Guid.newGuid();
        this.name = null;
        this.number = null;
        this.messages = [];
    }
    Dialog.prototype.DataContructor = function (data) {
        this.id = data.id;
        this.name = data.name;
        this.number = data.number;
        this.messages = data.messages;
    }
    
    return Dialog;
})();