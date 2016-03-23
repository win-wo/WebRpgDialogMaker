import Ember from 'ember';
import App from "ay-ember/app";

export default Ember.Component.extend({
    chapter : {
        dialogs : []
    },
    init(args){
        var chapter = App.Store.get("chapter").first();
        if(chapter){
            this.set("chapter", chapter);    
        }
        this._super(args);
    },
    actions : {
        saveEverything(){
            var chapter = this.get("chapter");
            chapter = App.Store.get("chapter").addOrUpdate(chapter);
            
            App.Store.save("chapter");
            this.set("chapter", chapter);
        },
        clearEverything(){
            debugger;
            var repo = App.Store.get("chapter");
            repo.clear();
            App.Store.save("chapter");
            this.set("chapter", {});
        }
    }
});
