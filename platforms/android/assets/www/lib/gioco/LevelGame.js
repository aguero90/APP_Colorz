
define(function (require) {

    // impostiamo le dipendenze
    var Game = require("game");
    var LevelGraphicsLayer = require("levelGraphicsLayer");

    var LevelGame = function (size, level) {

        // chiamiamo il costruttore della classe
        // padre, cioè Game, impostando il contesto a
        // questo oggetto appena creato.
        // in questo modo tutte le porprietà di Game
        // saranno assegnate a LevelGame
        Game.call(this, size);

        this.level = level;
        this.startTime = null;
        this.removedCount = 0;
        this.elapsedTime = 0;

        this.graphicsLayer = new LevelGraphicsLayer(this);
    };

    // diciamo che LevelGame deve avere lo stesso prototipo di
    // Game
    LevelGame.prototype = Object.create(Game.prototype);
    LevelGame.prototype.constructor = LevelGame;


    LevelGame.prototype.init = function () {

        Game.prototype.init.call(this);

        if (typeof this.level === 'string') {

            // se il livello ci è stato passato come stringa JSON e non come
            // oggetto JS => la parsiamo per trasformarla in oggetto
            this.level = JSON.parse(this.level);
        }

        this.startTime = new Date().getTime();

        this.graphicsLayer.init();
    };


    LevelGame.prototype.start = function () {

        Game.prototype.start.call(this);

        // avviamo il timer
        this.graphicsLayer.startTimer();
    };

    LevelGame.prototype.generateSolution = function () {

        // qui la soluzione viene presa da this.level.solution

        for (var row = 0; row < this.size; row++) {

            for (var column = 0; column < this.size; column++) {

                if (this.level.solution[row][column] !== "blank") {

                    this.chessboard.getCell(row, column).getDOMElement().Colorz.color = this.level.solution[row][column];

                    // decommentare se si vuole vedere la soluzione creata
                    // this.chessboard.getCell(row, column).getDOMElement().addClass("Chessboard-cell--" + level.solution[row][column]);
                }
            }
        }
    };

    LevelGame.prototype.pawnRemoved = function (row, column, color) {

        Game.prototype.pawnRemoved.call(this, row, column, color);

        this.removedCount++;
    };

    LevelGame.prototype.win = function () {

        this.pause();

        // nel momento in cui l'utente completa il puzzle ha una stellina
        // a priori
        var stars = 1;

        if (this.elapsedTime <= this.level.timeLimit) {
            stars++;
        }

        if (this.removedCount <= this.level.removedLimit) {
            stars++;
        }

        if (!this.level.cleared || stars > this.level.stars) {

            // aggiorniamo levels solo se necessario:
            // se è stata la prima volta che è stato completato
            // oppure se l'utente si è migliorato acquisendo più
            // stelle
            var levels = JSON.parse(window.localStorage.getItem('levels'));
            levels[this.level.number].cleared = true;

            if (stars > this.level.stars) {
                levels[this.level.number].stars = stars;
            }

            // diciamo che il livello successivo è stato sbloccato
            levels[this.level.number + 1].unlocked = true;

            window.localStorage.setItem('levels', JSON.stringify(levels));
        }

        var starsInfo = {
            number: stars,
            level: true,
            time: this.elapsedTime <= this.level.timeLimit,
            removed: this.removedCount <= this.level.removedLimit
        };

        // qui non chiamiamo il metodo della classe madre ma eseguiamo
        // tutto qui poichè dobbiamo fare cose completamente diverse
        this.graphicsLayer.showWinDialog(starsInfo);
    };

    LevelGame.prototype.pause = function () {

        Game.prototype.pause.call(this);

        // blocchiamo il timer

        // salviamo il tempo rimanente in modo da ripristinarlo
        // al resume
        this.elapsedTime = new Date().getTime() - this.startTime;
        this.graphicsLayer.stopTimer();
    };


    LevelGame.prototype.resume = function () {

        Game.prototype.resume.call(this);

        // riavviamo il timer
        // diciamo che il tempo di partenda è ora
        // meno il tempo passato
        // in questo modo ora - startTime sarà esattamente il tempo
        // trascorso dall'avvio del timer
        this.startTime = new Date().getTime() - this.elapsedTime;
        this.graphicsLayer.startTimer();

    };

    LevelGame.prototype.destroy = function () {

        Game.prototype.destroy.call(this);

//        this.level = null;
//        this.startTime = null;
//        this.removes = null;
    };


    // esponiamo il metodo pubblicamente
    return LevelGame;

});


