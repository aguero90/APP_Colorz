
define(function (require) {

    // impostiamo le dipendenze
    var Game = require("game");
    var RelaxGraphicsLayer = require("relaxGraphicsLayer");

    var RelaxGame = function (size) {

        // chiamiamo il costruttore della classe
        // padre, cioè Game, impostando il contesto a
        // questo oggetto appena creato.
        // in questo modo tutte le porprietà di Game
        // saranno assegnate a RelaxGame
        Game.call(this, size);

        this.graphicsLayer = new RelaxGraphicsLayer(this);
    };

    // diciamo che RelaxGame deve avere lo stesso prototipo di
    // Game
    RelaxGame.prototype = Object.create(Game.prototype);
    RelaxGame.prototype.constructor = RelaxGame;


    RelaxGame.prototype.init = function () {

        Game.prototype.init.call(this);

        this.graphicsLayer.init();
    };

    // non facciamo altro dal momento che relax non ha nulla in più
    // rispetto al semplice gioco

    // esponiamo pubblicamente il modulo
    return RelaxGame;

});

