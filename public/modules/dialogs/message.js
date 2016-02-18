app.Models.Message = (function () {
    function Message(vm) {
        if (vm) {
            this.id = vm.id || app.Utils.Guid.newGuid();
            this.character = vm.character;
            this.text = vm.text;
            this.choicesText = vm.choicesText;
            this.choices = this.parseChoices(this.choicesText);
        }
        else {
            this.id = app.Utils.Guid.newGuid();
            this.character = null;
            this.text = null;
            this.choicesText = null;
            this.choices = null;
        }
    }

    Message.prototype.parseChoices = function (stringChoices) {
        var choices = [];
        try {
            var lines = stringChoices.split("\n");

            _.forEach(lines, function (line) {
                var splittedLine = line.split("|");
                if (splittedLine[0] && splittedLine[1]) {
                    choices.push({
                        text: splittedLine[0],
                        id: splittedLine[1]
                    })
                }
            });
        } catch (error) {
            //ignore
        }
        return choices;
    }
    return Message;
})();