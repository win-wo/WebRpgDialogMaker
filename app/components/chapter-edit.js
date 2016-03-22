import Ember from 'ember';
import App from "ay-ember/app";

export default Ember.Component.extend({
    chapter : {},
    init(args){
        var repo = App.Store.get("chapter");
        if(repo.items.length > 0){
            this.set("chapter", repo.items[0]);    
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
            var repo = App.Store.get("chapter");
            repo.clear();
            App.Store.save("chapter");
            this.set("chapter", {});
        }
    }
});
