define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var RelaxView = Utils.Page.extend({
        constructorName: "RelaxView",
        id: "RelaxContainer",
        initialize: function (options) {

            this.template = Utils.templates.game;
            this.listenTo(this, "inTheDOM", this.onDOMReady);
        },
        render: function () {

            var context = {
                type: 'relax',
                title: ['r', 'e', 'l', 'a', 'x'],
                size: 6
            };

            $(this.el).html(this.template(context));
            return this;
        },
        onDOMReady: function () {

            var gioco = new Game(6);
            gioco.start();
        }
    });

    return RelaxView;

});