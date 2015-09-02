define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var StructureView = require("views/StructureView");
    var HomeView = require("views/pages/HomeView");
    var GameView = require("views/pages/GameView");

    var AppRouter = Backbone.Router.extend({
        constructorName: "AppRouter",
        routes: {
            // the default is the structure view
            "": "showStructure",
            "home": "HomeView",
            "game": "GameView"
        },
        firstView: "home",
        initialize: function (options) {
            this.currentView = undefined;
        },
        HomeView: function () {

            // create the view
            var page = new HomeView();
            // show the view
            this.changePage(page);
        },
        GameView: function () {
            // create the view and show it
            var page = new GameView();
            this.changePage(page);
        },
        // load the structure view
        showStructure: function () {
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            // go to first view
            this.navigate(this.firstView, {trigger: true});
        }
    });

    return AppRouter;

});