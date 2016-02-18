app.Models.Message = (function () {
    function Message(vm) {
        if (vm) {
            this.id = vm.id || app.Utils.Guid.newGuid();
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

    Message.prototype.parseChoices = function (stringChoices) {
        var that = this;
        this.choices = [];
        try {
            var lines = stringChoices.split("\n");

            _.forEach(lines, function (line) {
                var splittedLine = line.split("|");
                if (splittedLine[0] && splittedLine[1]) {
                    that.choices.push({
                        choice: splittedLine[0],
                        id : splittedLine[1]
                    })
                }
            });
        } catch (error) {
            //ignore
        }
    }
    return Message;
})();