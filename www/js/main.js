// here we put the paths to all the libraries and framework we will use
require.config({
    paths: {
        jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery',
        underscore: '../lib/underscore/underscore',
        backbone: "../lib/backbone/backbone",
        localstorage: "../lib/backbone/backbone.localStorage",
        text: '../lib/require/text',
        async: '../lib/require/async',
        handlebars: '../lib/handlebars/handlebars',
        templates: '../templates',
        utils: '../lib/utils/utils',
        interact: '../lib/interact/interact',
        pawn: '../lib/gioco/Pawn',
        cell: '../lib/gioco/Cell',
        chessboard: '../lib/gioco/Chessboard',
        game: '../lib/gioco/Game',
        relaxGame: '../lib/gioco/RelaxGame',
        timeGame: '../lib/gioco/TimeGame',
        levelGame: '../lib/gioco/LevelGame',
        graphicsLayer: '../lib/gioco/GraphicsLayer',
        relaxGraphicsLayer: '../lib/gioco/RelaxGraphicsLayer',
        timeGraphicsLayer: '../lib/gioco/TimeGraphicsLayer',
        levelGraphicsLayer: '../lib/gioco/LevelGraphicsLayer'
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

            window.localStorage.removeItem('Colorz');

            if (!window.localStorage.getItem('Colorz')) {

                // è il primo avvio dell'app
                // => carichiamo tutti i livelli nel localStorage
                var levels = {};

                levels['1'] = {"number": 1, "cleared": false, "unlocked": true, "stars": 0, "size": 3, "timeLimit": 120000, "removedLimit": 1, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['2'] = {"number": 2, "cleared": false, "unlocked": false, "stars": 0, "size": 3, "timeLimit": 120000, "removedLimit": 1, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['3'] = {"number": 3, "cleared": false, "unlocked": false, "stars": 0, "size": 3, "timeLimit": 120000, "removedLimit": 1, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['4'] = {"number": 4, "cleared": false, "unlocked": false, "stars": 0, "size": 3, "timeLimit": 120000, "removedLimit": 1, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};

                window.localStorage.setItem("levels", JSON.stringify(levels));

                // diciamo che abbiamo effettuato il primo lancio dell'app
                window.localStorage.setItem('Colorz', 'true');
            }

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

    });
});