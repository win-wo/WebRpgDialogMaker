import Ember from 'ember';
import Repo from 'ay-ember/utils/repo';

export default Ember.Component.extend({
    dialog: {
        messages: []
    },
    message: {},
    actions: {
        addMessage() {
            var message = this.get("message");
            message.id = Repo.guid();

            this.saveMessageInCurrentDialog(message);
        },
        saveMessage() {
            var message = this.get("message");
            this.saveMessageInCurrentDialog(message);
        },
        editMessage(message) {
            this.set("message", message);
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
        saveDialog() {
            var dialog = this.get("dialog");

            this.store.createdRecord("dialog", {
                "id": Repo.guid(),
                "name": dialog.name,
                "number": dialog.number,
                "messages": dialog.messages,
            });
        },
    },
    saveMessageInCurrentDialog(message) {
        var dialog = this.get("dialog");

        var messagesRepo = new Repo(dialog.messages);
        messagesRepo.save(message);

        this.set("dialog", dialog);
        this.set("message", {});
        this.rerender();
    },
});
