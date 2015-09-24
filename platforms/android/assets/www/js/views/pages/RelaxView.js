define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var GameView = Utils.Page.extend({
        constructorName: "RelaxView",
        id: "RelaxContainer",
        initialize: function (options) {
            this.template = Utils.templates.relax;
            this.listenTo(this, "inTheDOM", this.addGame);
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        addGame: function () {

            console.log("addGame");
            var gioco = new Game(6);
            gioco.start();
        }
    });

    return GameView;

});