define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var GameView = Utils.Page.extend({
        constructorName: "TimeView",
        id: "TimeContainer",
        initialize: function (options) {
            this.template = Utils.templates.time;
            this.listenTo(this, "inTheDOM", this.addGame);
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        addGame: function () {

            console.log("addGame");
            var gioco = new Game(6, 3);
            gioco.start();

        }
    });

    return GameView;

});