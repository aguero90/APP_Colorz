define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Interact = require("interact");

    var LevelListView = Utils.Page.extend({
        constructorName: "LevelListView",
        id: "LevelListContainer",
        initialize: function (options) {

            // prendiamo tutti i livelli da localStorage
            this.levels = JSON.parse(window.localStorage.getItem('levels'));
            this.template = Utils.templates.levelList;


            this.listenTo(this, "inTheDOM", this.onDOMReady);
            this.listenTo(this, "removing", this.onRemove);

        },
        render: function () {

            this.el.innerHTML = this.template({levels: this.levels});
            return this;
        },
        // questa funzione viene chiamata nel momento in cui il DOM è stato caricato
        onDOMReady: function () {

            // aggiungiamo degi listener a tutti i bottoni dei livelli
            Interact('.LevelButton--unlocked').on('tap', this.goToLevel);


            this.onBackButton = this.onBackButton.bind(this);
            document.addEventListener('backbutton', this.onBackButton);
        },
        onRemove: function () {

            Interact('.LevelButton--unlocked').unset();
            document.removeEventListener('backbutton', this.onBackButton);
        },
        onBackButton: function () {

            Backbone.history.history.back();
        },
        goToLevel: function (e) {

            // al tap su un livello, chiamiamo la view Level passandogli come argomento
            // il numero del livello.
            Backbone.history.navigate("level/" + e.currentTarget.getAttribute('data-number'), {trigger: true});
        }
    });

    return LevelListView;

});