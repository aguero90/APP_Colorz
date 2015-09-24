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

                levels['1'] = {number: 1, difficulty: 1, cleared: true, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['2'] = {number: 2, difficulty: 3, cleared: true, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['3'] = {number: 3, difficulty: 1, cleared: true, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['4'] = {number: 4, difficulty: 3, cleared: false, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['5'] = {number: 5, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['6'] = {number: 6, difficulty: 3, cleared: false, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['7'] = {number: 7, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['8'] = {number: 8, difficulty: 3, cleared: false, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['9'] = {number: 9, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['10'] = {number: 10, difficulty: 3, cleared: true, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['11'] = {number: 11, difficulty: 1, cleared: true, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['12'] = {number: 12, difficulty: 3, cleared: false, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['13'] = {number: 13, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['14'] = {number: 14, difficulty: 3, cleared: true, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['15'] = {number: 15, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['16'] = {number: 16, difficulty: 3, cleared: false, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['17'] = {number: 17, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['18'] = {number: 18, difficulty: 3, cleared: false, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};
                levels['19'] = {number: 19, difficulty: 1, cleared: false, solution: {"0": {"0": "red", "1": "green", "2": "blue", "3": "void", "4": "void", "5": "void"}, "1": {"0": "void", "1": "red", "2": "green", "3": "blue", "4": "void", "5": "void"}, "2": {"0": "void", "1": "void", "2": "red", "3": "green", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "void", "2": "void", "3": "red", "4": "green", "5": "blue"}, "4": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "red", "5": "green"}, "5": {"0": "green", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "red"}}};
                levels['20'] = {number: 20, difficulty: 3, cleared: true, solution: {"0": {"0": "blue", "1": "void", "2": "void", "3": "void", "4": "green", "5": "red"}, "1": {"0": "void", "1": "void", "2": "void", "3": "green", "4": "red", "5": "blue"}, "2": {"0": "void", "1": "void", "2": "green", "3": "red", "4": "blue", "5": "void"}, "3": {"0": "void", "1": "green", "2": "red", "3": "blue", "4": "void", "5": "void"}, "4": {"0": "green", "1": "red", "2": "blue", "3": "void", "4": "void", "5": "void"}, "5": {"0": "red", "1": "blue", "2": "void", "3": "void", "4": "void", "5": "green"}}};

                window.localStorage.setItem("levels", JSON.stringify(levels));


                // diciamo che abbiamo effettuato il primo lancio dell'app
                // window.localStorage.setItem('Colorz', 'true');
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