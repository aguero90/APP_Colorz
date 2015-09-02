define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var HomeView = Utils.Page.extend({
        constructorName: "HomeView",
        id: "home",
        className: "i-g page",
        events: {
            "tap #goToGame": "goToGame"
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
        goToGame: function (e) {
            Backbone.history.navigate("game", {
                trigger: true
            });
        }
    });

    return HomeView;

});