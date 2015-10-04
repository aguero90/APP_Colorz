define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var TimeGame = require("timeGame");

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

            var game = new TimeGame(6, 3);
            game.start();
        }
    });

    return TimeView;

});