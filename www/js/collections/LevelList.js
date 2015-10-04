
define(function (require) {

    var Backbone = require("backbone");
    var LocalStorage = require("localstorage");
    var Level = require("models/Level");

    var LevelList = Backbone.Collection.extend({
        constructorName: "LevelList",
        model: Level,
        localStorage: new Backbone.LocalStorage("todos-backbone"),
        sync: function (method, model, options) {

            debugger;

            switch (method) {

                case 'create':
                    window.localStorage.setItem('levels', JSON.stringify(this.models));
                    window.localStorage.removeItem('levels');
                    break;
            }

        },
        add: function (models, options) {

            this.sync('create', models);
        }

    });

    return LevelList;
});

