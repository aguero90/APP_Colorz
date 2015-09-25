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


            if (!window.localStorage.getItem('Colorz')) {

                // è il primo avvio dell'app
                // => carichiamo tutti i livelli nel localStorage
                var levels = {};


                levels['1'] = {"number": 1, "cleared": false, "stars": 0, "size": 3, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['2'] = {"number": 2, "cleared": false, "stars": 0, "size": 4, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue"}, "2": {"0": "blue", "1": "void", "2": "red", "3": "green"}, "3": {"0": "green", "1": "blue", "2": "void", "3": "red"}}};
                levels['3'] = {"number": 3, "cleared": false, "stars": 0, "size": 5, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue"}, "3": {"0": "blue", "1": "void", "2": "void", "3": "red", "4": "green"}, "4": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "red"}}};
                levels['4'] = {"number": 4, "cleared": false, "stars": 0, "size": 6, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['5'] = {"number": 1, "cleared": false, "stars": 0, "size": 3, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['6'] = {"number": 2, "cleared": false, "stars": 0, "size": 4, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue"}, "2": {"0": "blue", "1": "void", "2": "red", "3": "green"}, "3": {"0": "green", "1": "blue", "2": "void", "3": "red"}}};
                levels['7'] = {"number": 3, "cleared": false, "stars": 0, "size": 5, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue"}, "3": {"0": "blue", "1": "void", "2": "void", "3": "red", "4": "green"}, "4": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "red"}}};
                levels['8'] = {"number": 4, "cleared": false, "stars": 0, "size": 6, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['9'] = {"number": 1, "cleared": false, "stars": 0, "size": 3, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['10'] = {"number": 2, "cleared": false, "stars": 0, "size": 4, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue"}, "2": {"0": "blue", "1": "void", "2": "red", "3": "green"}, "3": {"0": "green", "1": "blue", "2": "void", "3": "red"}}};
                levels['11'] = {"number": 3, "cleared": false, "stars": 0, "size": 5, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue"}, "3": {"0": "blue", "1": "void", "2": "void", "3": "red", "4": "green"}, "4": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "red"}}};
                levels['12'] = {"number": 4, "cleared": false, "stars": 0, "size": 6, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['13'] = {"number": 1, "cleared": false, "stars": 0, "size": 3, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['14'] = {"number": 2, "cleared": false, "stars": 0, "size": 4, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue"}, "2": {"0": "blue", "1": "void", "2": "red", "3": "green"}, "3": {"0": "green", "1": "blue", "2": "void", "3": "red"}}};
                levels['15'] = {"number": 3, "cleared": false, "stars": 0, "size": 5, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue"}, "3": {"0": "blue", "1": "void", "2": "void", "3": "red", "4": "green"}, "4": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "red"}}};
                levels['16'] = {"number": 4, "cleared": false, "stars": 0, "size": 6, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['17'] = {"number": 1, "cleared": false, "stars": 0, "size": 3, "solution": {"0": {"0": "red", "1": "green", "2": "blue"}, "1": {"0": "blue", "1": "red", "2": "green"}, "2": {"0": "green", "1": "blue", "2": "red"}}};
                levels['18'] = {"number": 2, "cleared": false, "stars": 0, "size": 4, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue"}, "2": {"0": "blue", "1": "void", "2": "red", "3": "green"}, "3": {"0": "green", "1": "blue", "2": "void", "3": "red"}}};
                levels['19'] = {"number": 3, "cleared": false, "stars": 0, "size": 5, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue"}, "3": {"0": "blue", "1": "void", "2": "void", "3": "red", "4": "green"}, "4": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "red"}}};
                levels['20'] = {"number": 4, "cleared": false, "stars": 0, "size": 6, "solution": {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};



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