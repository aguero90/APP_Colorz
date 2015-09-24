define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var GameView = Utils.Page.extend({
        constructorName: "LevelView",
        id: "LevelContainer",
        initialize: function (number) {

            this.number = number;

            this.template = Utils.templates.level;
            this.listenTo(this, "inTheDOM", this.addGame);
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        addGame: function () {

            var level = JSON.parse(window.localStorage.getItem('levels'))[this.number];

            console.log("addGame");
            var gioco = new Game(6, null, level);
            gioco.start();
        }
    });

    return GameView;

});