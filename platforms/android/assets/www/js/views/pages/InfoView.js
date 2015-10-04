define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Interact = require("interact");


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
            this.listenTo(this, "inTheDOM", this.onTheDOM);
            this.listenTo(this, "removing", this.onRemove);

            // by convention, all the inner views of a view must be stored in this.subViews
        },
        render: function () {

            this.el.innerHTML = this.template();
            return this;
        },
        onTheDOM: function () {

            this.onBackButton = this.onBackButton.bind(this);
            document.addEventListener('backbutton', this.onBackButton);

            Interact('#Info-list-item--tutorial').on('tap', this.goToTutorial);
            Interact('#Info-list-item--credits').on('tap', this.toggleCredits);

            var info = document.createElement("div");

            info.innerHTML = "devicePixelRatio: " + window.devicePixelRatio + "</br>";
            info.innerHTML += "width: " + screen.width + "</br>";
            info.innerHTML += "height: " + screen.height + "</br>";
            info.innerHTML += "innerWidth (CSS pixel): " + window.innerWidth + "</br>";
            info.innerHTML += "innerHeight  (CSS pixel): " + window.innerHeight + "</br>";
            info.innerHTML += "outerWidth: " + window.outerWidth + "</br>";
            info.innerHTML += "outerHeight: " + window.outerHeight + "</br>";
            info.innerHTML += "</br>";
            info.innerHTML += "platform: " + window.cordova.platformId + "</br>";
            info.innerHTML += "platformVersion: " + window.cordova.platformVersion + "</br>";

            document.getElementById("deviceInfo").appendChild(info);
        },
        onRemove: function () {

            document.removeEventListener('backbutton', this.onBackButton);
            Interact('#Info-list-item--tutorial').unset();
            Interact('#Info-list-item--credits').unset();
        },
        onBackButton: function () {

            Backbone.history.history.back();
        },
        goToTutorial: function () {

            Backbone.history.navigate("tutorial", {trigger: true});
        },
        toggleCredits: function () {

            document.getElementById('Info-list-item--credits').toggleClass('show');
        }

    });

    return InfoView;

});