define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var GameView = Utils.Page.extend({
        constructorName: "GameView",
        id: "game",
        initialize: function (options) {
            this.template = Utils.templates.game;
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