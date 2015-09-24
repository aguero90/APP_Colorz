define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var GameView = Utils.Page.extend({
        constructorName: "LevelView",
        id: "LevelListContainer",
        initialize: function (options) {
            this.template = Utils.templates.levelList;
            this.listenTo(this, "inTheDOM", this.addGame);
        },
        render: function () {

            var levels = JSON.parse(window.localStorage.getItem('levels'));

            $(this.el).html(this.template({levels: levels}));

            return this;
        },
        addGame: function () {

            interact('.LevelButton').on('tap', this.goToLevel);
        },
        goToLevel: function (e) {

            Backbone.history.navigate("level/" + e.currentTarget.getAttribute('data-number'), {trigger: true});
        }
    });

    return GameView;

});