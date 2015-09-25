define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var GameView = Utils.Page.extend({
        constructorName: "LevelView",
        id: "LevelListContainer",
        initialize: function (options) {

            // prendiamo tutti i livelli da localStorage
            this.levels = JSON.parse(window.localStorage.getItem('levels'));
            this.template = Utils.templates.levelList;


            this.listenTo(this, "inTheDOM", this.onDOMReady);

        },
        render: function () {

            $(this.el).html(this.template({levels: this.levels}));

            return this;
        },
        // questa funzione viene chiamata nel momento in cui il DOM è stato caricato
        onDOMReady: function () {

            // aggiungiamo degi listener a tutti i bottoni dei livelli
            interact('.LevelButton').on('tap', this.goToLevel);
        },
        goToLevel: function (e) {

            // al tap su un livello, chiamiamo la view Level passandogli come argomento
            // il numero del livello.
            Backbone.history.navigate("level/" + e.currentTarget.getAttribute('data-number'), {trigger: true});
        }
    });

    return GameView;

});