define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var HomeView = Utils.Page.extend({
        constructorName: "HomeView",
        id: "HomeContainer",
        // qui inseriamo eventuali classi che vogliamo aggiungere
        // al wrapper del template
        className: "",
        events: {
            "tap #goToRelax": "goToRelax",
            "tap #goToTime": "goToTime",
            "tap #goToLevels": "goToLevels",
            "tap #goToInfo": "goToInfo"
        },
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.home;
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        goToRelax: function (e) {
            Backbone.history.navigate("relax", {trigger: true});
        },
        goToTime: function (e) {
            Backbone.history.navigate("time", {trigger: true});
        },
        goToLevels: function (e) {
            Backbone.history.navigate("levelList", {trigger: true});
        },
        goToInfo: function (e) {
            Backbone.history.navigate("info", {trigger: true});
        }
    });

    return HomeView;

});