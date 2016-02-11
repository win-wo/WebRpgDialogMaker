(function(){
    app.factory("dialogModel", function(){return dialogModel})
    
    function dialogModel(){
        this.id = null;
        this.image = null;
        this.name = null;
        this.text = null; //translate ?
        this.next = null;
    }
})();