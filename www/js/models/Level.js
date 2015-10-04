
define(function (require) {

    var Backbone = require("backbone");

    var Level = Backbone.Model.extend({
        constructorName: "Level",
        initialize: function (options) {

            this.number = options.number;
            this.cleared = options.cleared;
            this.stars = options.stars;
            this.size = options.size;
            this.timeLimit = options.timeLimit;
            this.removedLimit = options.removedLimit;
            this.solution = options.solution;
        },
        sync: function () {

            debugger;
        }
    });

    return Level;
});


