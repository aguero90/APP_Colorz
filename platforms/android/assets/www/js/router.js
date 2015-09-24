define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var StructureView = require("views/StructureView");
    var HomeView = require("views/pages/HomeView");
    var RelaxView = require("views/pages/RelaxView");
    var TimeView = require("views/pages/TimeView");
    var LevelListView = require("views/pages/LevelListView");
    var LevelView = require("views/pages/LevelView");
    var InfoView = require("views/pages/InfoView");

    var AppRouter = Backbone.Router.extend({
        constructorName: "AppRouter",
        routes: {
            // the default is the structure view
            "": "showStructure",
            "home": "HomeView",
            "relax": "RelaxView",
            "time": "TimeView",
            "levelList": "LevelListView",
            "level/:number": "LevelView",
            "info": "InfoView"
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
        RelaxView: function () {
            // create the view and show it
            var page = new RelaxView();
            this.changePage(page);
        },
        TimeView: function () {
            // create the view and show it
            var page = new TimeView();
            this.changePage(page);
        },
        LevelListView: function () {
            // create the view and show it
            var page = new LevelListView();
            this.changePage(page);
        },
        LevelView: function (number) {

            // create the view and show it
            var page = new LevelView(number);
            this.changePage(page);
        },
        InfoView: function () {
            // create the view and show it
            var page = new InfoView();
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