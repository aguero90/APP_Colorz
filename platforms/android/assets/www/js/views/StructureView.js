define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");

    var StructureView = Backbone.View.extend({
        constructorName: "StructureView",
        id: "main",
        events: {
        },
        initialize: function (options) {
            // load the precompiled template
            this.template = Utils.templates.structure;
            //this.on("inTheDOM", this.rendered);
            // bind the back event to the goBack function
            //document.getElementById("back").addEventListener("back", this.goBack(), false);
        },
        render: function () {
            // load the template
            this.el.innerHTML = this.template({});
            // cache a reference to the content element
            this.contentElement = this.$el.find('#content')[0];
            return this;
        },
        // rendered: function(e) {
        // },

        // generic go-back function
        goBack: function () {
            //window.history.back();
        },
        setActiveTabBarElement: function (elementId) {

        },
        game: function (event) {
            Backbone.history.navigate("game", {trigger: true});
        },
        home: function (event) {
            Backbone.history.navigate("home", {trigger: true});
        }
    });

    return StructureView;

});