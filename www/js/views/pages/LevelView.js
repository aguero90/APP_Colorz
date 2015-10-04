define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var LevelGame = require("levelGame");

    var LevelView = Utils.Page.extend({
        constructorName: "LevelView",
        id: "LevelContainer",
        initialize: function (number) {

            // prendiamo il livello dal local storage
            this.level = JSON.parse(window.localStorage.getItem('levels'))[number];

            // diciamo chi è il template di questa view
            this.template = Utils.templates.game;

            this.listenTo(this, "inTheDOM", this.onDOMReady);
        },
        render: function () {

            var context = {
                type: 'level',
                title: ['l', 'i', 'v', 'e', 'l', 'l', 'o'],
                size: this.level.size
            };

            $(this.el).html(this.template(context));
            return this;
        },
        onDOMReady: function () {

            // quando il DOM è pronto, creiamo il gioco e lo avviamo
            var game = new LevelGame(this.level.size, this.level);
            game.start();
        }
    });

    return LevelView;

});