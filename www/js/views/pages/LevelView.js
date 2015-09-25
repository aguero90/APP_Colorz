define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

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
                title: ['l', 'e', 'v', 'e', 'l'],
                size: this.level.size
            };

            $(this.el).html(this.template(context));
            return this;
        },
        onDOMReady: function () {

            // quando il DOM è pronto, creiamo il gioco e lo avviamo
            var gioco = new Game(this.level.size, null, this.level);
            gioco.start();
        }
    });

    return LevelView;

});