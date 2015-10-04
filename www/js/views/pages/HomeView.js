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
        },
        onRemove: function () {

            document.removeEventListener('backbutton', this.onBackButton);
        },
        onBackButton: function () {

            var now = new Date().getTime();

            if (this.tappedTime && now - this.tappedTime <= 3000) {

                // se siamo al secondo tap ( poichè this.tapped time non è undefined )
                // e se i due tap sono avvenuti a distanza di 1 secondo
                navigator.app.exitApp();

            } else {

                // è stato effettuato il primo tap del tasto back
                // mostriamo la notifica toast
                this.showToast("Premere due volte per uscire");

                // e ci ricordiamo del primo tap
                this.tappedTime = now;
            }
        },
        showToast: function (message) {
            var toast = document.getElementById('toast');

            toast.innerHTML = message;
            toast.addClass('show');

            // dopo 1 secondo nascondiamo il toast
            setTimeout(this.hideToast, 3000);
        },
        hideToast: function () {


            var toast = document.getElementById('toast');

            if (toast) {

                // mettiamo la guardia poichè l'utente potrebbe aver
                // cambiato view mentre il toast era presente.
                // in questo caso risulterebbe null
                toast.removeClass('show');
            }

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