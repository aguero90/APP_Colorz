
// Questa classe estende Game
// Per farlo eseguiamo 3 semplici passi:
//
// 1. copiamo il prototipo di Game nel prototipo di TimerGame
// 2. eventualmente sovrascriviamo le funzioni nel prototipo con alcune nuove
// 3. chiamiamo il costruttore di Game impostando come contesto di esecuzione
//    quello di TimerGame

define(function (require) {

    // impostiamo le dipendenze
    var Game = require("game");
    var TimeGraphicsLayer = require("timeGraphicsLayer");

    /**
     *
     * @param {Number} size - la taglia della scacchiera. Ad esempio, se viene
     *                        passato 6 => avremo una scacchiera 6x6
     * @param {Number} time - Il tempo in minuti
     * @returns {TimerGame_L10.TimerGame}
     */
    var TimeGame = function (size, time) {

        // chiamiamo il costruttore della classe
        // padre, cioè Game, impostando il contesto a
        // questo oggetto appena creato.
        // in questo modo tutte le porprietà di Game
        // saranno assegnate a TimerGame
        Game.call(this, size);

        this.time = time;
        this.timeLeft = null;
        this.endTime = null;

        this.graphicsLayer = new TimeGraphicsLayer(this);
    };

    // diciamo che TimerGame deve avere lo stesso prototipo di
    // Game
    TimeGame.prototype = Object.create(Game.prototype);
    TimeGame.prototype.constructor = TimeGame;



    TimeGame.prototype.init = function () {

        Game.prototype.init.call(this);

        // calcoliamo il tempo restante in millisecondi
        // this.time indica i minuti
        this.timeLeft = this.time * 60 * 1000;

        // aggiungiamo "time" minuti alla data di inizio
        this.endTime = new Date().getTime() + this.timeLeft;

        this.graphicsLayer.init();
    };


    TimeGame.prototype.start = function () {

        Game.prototype.start.call(this);

        // avviamo il timer
        this.graphicsLayer.startTimer();
    };


    TimeGame.prototype.restart = function () {

        Game.prototype.restart.call(this);

        // resettiamo il timer e lo riavviamovviamo
        //
        // calcoliamo il tempo restante in millisecondi
        this.timeLeft = this.time * 60 * 1000;

        // aggiungiamo "time" minuti alla data di inizio
        this.endTime = new Date().getTime() + this.timeLeft;

        this.graphicsLayer.startTimer();
    };


    TimeGame.prototype.pause = function () {

        Game.prototype.pause.call(this);

        // blocchiamo il timer

        // salviamo il tempo rimanente in modo da ripristinarlo
        // al resume
        this.timeLeft = this.endTime - new Date().getTime();
        this.graphicsLayer.stopTimer();
    };


    TimeGame.prototype.resume = function () {

        Game.prototype.resume.call(this);

        // riavviamo il timer
        this.endTime = new Date().getTime() + this.timeLeft;
        this.graphicsLayer.startTimer();

    };

    TimeGame.prototype.timeUp = function () {

        this.pause();
        this.graphicsLayer.TimeUpDialog.removeClass('is-hidden');
    };


    TimeGame.prototype.destroy = function () {

        Game.prototype.destroy.call(this);

//        this.time = null;
//        this.timeLeft = null;
//        this.endTime = null;
    };


    // esponiamo il metodo pubblicamente
    return TimeGame;

});

