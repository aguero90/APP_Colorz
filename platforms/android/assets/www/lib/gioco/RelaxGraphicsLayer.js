
define(function (require) {

    var GraphicsLayer = require("graphicsLayer");

    var RelaxGraphicsLayer = function (game) {

        GraphicsLayer.call(this, game);
    };

    RelaxGraphicsLayer.prototype = Object.create(GraphicsLayer.prototype);
    RelaxGraphicsLayer.prototype.constructor = RelaxGraphicsLayer;

    RelaxGraphicsLayer.prototype.onTapNewGameWin = function (e) {

        GraphicsLayer.prototype.onTapNewGameWin.call(this);

        this.game.restart();
    };

    // esponiamo pubblicamente il modulo
    return RelaxGraphicsLayer;
});


