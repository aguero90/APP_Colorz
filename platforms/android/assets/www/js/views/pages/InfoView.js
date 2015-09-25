define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var InfoView = Utils.Page.extend({
        constructorName: "InfoView",
        id: "InfoContainer",
        // qui inseriamo eventuali classi che vogliamo aggiungere
        // al wrapper del template
        className: "",
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.info;
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

            var context = {size: 3};

            $(this.el).html(this.template(context));
            return this;
        }

    });

    return InfoView;

});