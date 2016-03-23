import Ember from 'ember';
import Repo from 'ay-ember/utils/repo';
import App from 'ay-ember/app';

export default Ember.Component.extend({
    dialog: {
        messages: []
    },
    message: {},
    actions: {
        addOrUpdateMessage() {
            var message = this.get("message");
            this.saveMessageInCurrentDialog(message);
        },
        editMessage(message) {
            this.set("message", Ember.copy(message));
            this.rerender();
        },
        duplicateMessage(message) {
            var dialog = this.get("dialog");
            var messagesRepo = new Repo(dialog.messages);
            messagesRepo.duplicate(message);
            this.rerender();
        },
        moveUpMessage(message) {
            var dialog = this.get("dialog");
            var messagesRepo = new Repo(dialog.messages);
            messagesRepo.moveUp(message);
            this.rerender();
        },
        moveDownMessage(message) {
            var dialog = this.get("dialog");
            var messagesRepo = new Repo(dialog.messages);
            messagesRepo.moveDown(message);
            this.rerender();
        },
        removeMessage(message) {
            var dialog = this.get("dialog");
            var messagesRepo = new Repo(dialog.messages);
            messagesRepo.remove(message);
            this.rerender();
        },
        addOrUpdateDialog() {
            debugger;
            var dialog = this.get("dialog");
            var chapterRepo = App.Store.get("chapter");
            var chapter = chapterRepo.first();

            var dialogRepo = new Repo(chapter.dialogs);
            
            dialogRepo.addOrUpdate(dialog);
            chapterRepo.addOrUpdate(chapter);
            
            App.Store.save("chapter");
            this.transitionTo('index');
        }
    },
    saveMessageInCurrentDialog(message) {
        var dialog = this.get("dialog");

        var messagesRepo = new Repo(dialog.messages);
        messagesRepo.addOrUpdate(message);

        this.set("dialog", dialog);
        this.set("message", {});
        this.rerender();
    },
});
