import Ember from 'ember';
import Repo from "ay-ember/utils/repo";

export default Ember.Component.extend({
    store: Ember.inject.service(),
    chapter : {},
    actions : {
        saveEverything(){
            var store = this.get("store");
            var chapter = this.get("chapter");
            chapter.id = chapter.id || Repo.guid();
            
            localStorage.chapter = JSON.stringify(vm.chapterData.chapter);
        },
        clearEverything(){
            
        }
    }
});
