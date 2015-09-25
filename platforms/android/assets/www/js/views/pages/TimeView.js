define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var TimeView = Utils.Page.extend({
        constructorName: "TimeView",
        id: "TimeContainer",
        initialize: function (options) {

            this.template = Utils.templates.game;
            this.listenTo(this, "inTheDOM", this.onDOMReady);
        },
        render: function () {

            var context = {
                type: 'time',
                title: ['t', 'e', 'm', 'p', 'o'],
                timer: true,
                size: 6
            };

            $(this.el).html(this.template(context));
            return this;
        },
        onDOMReady: function () {


            var gioco = new Game(6, 3);
            gioco.start();

        }
    });

    return TimeView;

});