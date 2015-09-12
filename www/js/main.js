// here we put the paths to all the libraries and framework we will use
require.config({
    paths: {
        jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery',
        underscore: '../lib/underscore/underscore',
        backbone: "../lib/backbone/backbone",
        text: '../lib/require/text',
        async: '../lib/require/async',
        handlebars: '../lib/handlebars/handlebars',
        templates: '../templates',
        utils: '../lib/utils/utils',
        gioco: '../lib/gioco/gioco'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

// We launch the App
require(['backbone', 'utils'], function (Backbone, Utils) {
    require(['router'], function (AppRouter) {

        document.addEventListener("deviceready", run, false);

        function run() {

            document.addEventListener("backbutton", onBackKeyDown, false);


            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js
            Utils.loadTemplates().once("templatesLoaded", function () {

                // var images = []; // here the developer can add the paths to the images that he would like to be preloaded

                // if (images.length) {
                //    new PreLoader(images, {onComplete: startRouter});
                // } else {
                // start the router directly if there are no images to be preloaded
                console.log("start routing");
                startRouter();
                //}

                function startRouter() {
                    // launch the router
                    var router = new AppRouter();
                    Backbone.history.start();
                }
            });
        }



        function onBackKeyDown() {

            console.log("onBackKeyDown()");


            if (document.getElementById("GameContainer")) {

                // siamo nella view del gioco

                if (!document.getElementById("ColorSelectionContainer").hasClass("is-hidden")) {

                    // il tasto back è stato premuto nel momento in cui è visibile la finestra
                    // => chiudiamo semplicemente la finestra per la selezione
                    //    dei colori

                    document.getElementById("ColorSelectionContainer").addClass("is-hidden");
                    return;
                }

                // altrimenti il tasto è stato premuto durante il gioco
                // => chiediamo la conferma
                alert("sei sicuro di voler tornare al menù perdendo i progressi della partita?");
            }
        }
    });
});