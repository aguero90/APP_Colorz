
define(function (require) {

    // impostiamo le dipendenze
    var Backbone = require("backbone");
    var Chessboard = require("chessboard");
    var Pawn = require("pawn");

    /**
     *
     * @param {Number} size - The size of the game, for example 6 for 6*6
     * @param {Number} time - This argument indicate the minutes
     * @param {Number} level - The level object or JSON of level
     * @returns {Game}
     */
    var Game = function (size) {

        this.size = size;

        this.chessboard = new Chessboard(size, document.getElementById("Chessboard"));

        this.pawnLeft = {
            red: [],
            green: [],
            blue: [],
            marker: []
        };
    };


    Game.prototype.init = function () {

        for (var i = 0; i < this.size; i++) {

            this.pawnLeft.red.push(new Pawn(Pawn.RED));
            this.pawnLeft.green.push(new Pawn(Pawn.GREEN));
            this.pawnLeft.blue.push(new Pawn(Pawn.BLUE));
        }

        for (var i = 0; i < this.size * this.size; i++) {

            this.pawnLeft.marker.push(new Pawn(Pawn.MARKER));
        }
    };

    Game.prototype.start = function () {

        this.init();
        this.createLevel();
    };

    Game.prototype.restart = function () {

        this.clearLevel();
        this.createLevel();
        this.graphicsLayer.addHandler();
    };

    // questa funzione pulisce tutte le celle
    // dalle pedine
    // e resetta anche tutti i bordi
    Game.prototype.clearLevel = function () {

        var cell;
        var pawn;

        for (var row = 0; row < this.size; row++) {

            for (var column = 0; column < this.size; column++) {

                cell = this.chessboard.getCell(row, column);

                // ripuliamo prima i bordi della cella
                // ripuliamo anche i bordi della cella
                cell.clearBorder();
                this.graphicsLayer.clearBorder(cell.getDOMElement());

                if (!cell.isEmpty()) {

                    // se la cella non è vuota
                    // prima prendiamo la pedina
                    pawn = cell.getPawn();

                    // poi puliamo la cella e la pedina
                    cell.clear();
                    pawn.setCell(null);
                    pawn.isPlaced(false);

                    // reinseriamo la pedina nell'array di quelle restanti
                    this.pawnLeft[pawn.getColor()].push(pawn);

                    // se la pedina non è il marker
                    // la riportiamo all'inizio
                    // ed aggiorniamo la grafica delle pedine rimanenti
                    if (pawn.getColor() !== Pawn.MARKER) {

                        if (this.pawnLeft[pawn.getColor()].length - 1 !== 0) {

                            // se prima di questa c'era già un altra pedina
                            // => rimuoviamo quella pedina dal DOM
                            this.graphicsLayer.removeFromDOM(this.pawnLeft[pawn.getColor()][this.pawnLeft[pawn.getColor()].length - 2].getDOMElement());
                        }

                        this.graphicsLayer.movePawnToStart(pawn.getDOMElement());
                        this.graphicsLayer.updatePawnLeft(pawn.getDOMElement(), pawn.getColor(), this.pawnLeft[pawn.getColor()].length);
                    } else {

                        // la pedina è un marker
                        // => rimuoviamo l'icona del marker
                        this.graphicsLayer.unmarkCell(cell.getDOMElement());
                    }
                }
            }
        }
    };

    Game.prototype.createLevel = function () {

        this.generateSolution();
        this.generateBorderFromSolution();
        this.clearSolution();
    };

    Game.prototype.clearSolution = function () {

        for (var row = 0; row < this.size; row++) {

            for (var column = 0; column < this.size; column++) {

                delete this.chessboard.getCell(row, column).getDOMElement().Colorz.color;
            }
        }
    };

    Game.prototype.cellHasColor = function (row, column) {

        return this.chessboard.getCell(row, column).getDOMElement().Colorz.color;
    };

    Game.prototype.colorInColumn = function (color, column) {

        for (var row = 0; row < this.size; row++) {

            if (this.chessboard.getCell(row, column).getDOMElement().Colorz.color === color) {

                return true;
            }
        }

        return false;
    };

    Game.prototype.generateSolution = function () {

        var colorLeft;
        var positionLeft;
        var randomColor;
        var randomPosition;

        for (var row = 0; row < this.size; row++) {

            colorLeft = ["red", "green", "blue"];

            // finchè non ho inserito tutti i colori
            while (colorLeft.length > 0) {

                positionLeft = [0, 1, 2, 3, 4, 5];

                // tra i colori da scegliere ne prendiamo uno a caso rimuovendolo
                // dall'array
                randomColor = colorLeft.splice((Math.random() * 1000) % colorLeft.length, 1)[0];
                randomPosition = positionLeft.splice((Math.random() * 1000) % positionLeft.length, 1)[0];

                // finchè non trovi una posizione che vada bene per il colore
                while (this.cellHasColor(row, randomPosition) || this.colorInColumn(randomColor, randomPosition)) {

                    if (positionLeft.length === 0) {

                        // Purtroppo questo algoritmo non genera sempre una
                        // soluzione corretta.
                        // Infatti potrebbe accadere che l'array delle posizioni
                        // disponibili sia vuoto, cioè che non abbiamo
                        // più celle libere per poter posizionare il colore
                        this.clearSolution();
                        this.generateSolution();
                        return;
                    }

                    // Se la cella in cui vogliamo inserire il colore è
                    // già occupata oppure il colore in questione è già
                    // presente nella colonna
                    // => selezioniamo un'altra posizione random
                    randomPosition = positionLeft.splice((Math.random() * 1000) % positionLeft.length, 1)[0];
                }

                // sono uscito dal while perché ho trovato dove posizionare
                // il colore.
                // => inserisco il colore nella posizione trovata
                this.chessboard.getCell(row, randomPosition).getDOMElement().Colorz.color = randomColor;


                // Decommentare se si vuole vedere la soluzione generata
                // this.chessboard.getCell(row, randomPosition).getDOMElement().addClass("Chessboard-cell--" + randomColor);
            }
        }
    };

    Game.prototype.generateBorderFromSolution = function () {

        var color;

        // facciamo prima il bordo sinistro e destro
        for (var row = 0; row < this.size; row++) {

            // bordo sinistro
            for (var column = 0; column < this.size; column++) {

                if (this.cellHasColor(row, column)) {

                    color = this.chessboard.getCell(row, column).getDOMElement().Colorz.color;

                    this.chessboard.getCell(row, 0).setBorderColorLeft(color);
                    this.graphicsLayer.updateBorder(this.chessboard.getCell(row, 0).getDOMElement(), 'left', color);
                    break;
                }
            }

            // bordo destro
            for (var column = this.size - 1; column >= 0; column--) {

                if (this.cellHasColor(row, column)) {

                    color = this.chessboard.getCell(row, column).getDOMElement().Colorz.color;

                    this.chessboard.getCell(row, this.size - 1).setBorderColorRight(color);
                    this.graphicsLayer.updateBorder(this.chessboard.getCell(row, this.size - 1).getDOMElement(), 'right', color);
                    break;
                }
            }
        }

        // facciamo ora bordo sopra e sotto
        for (var column = 0; column < this.size; column++) {

            // bordo sopra
            for (var row = 0; row < this.size; row++) {

                if (this.cellHasColor(row, column)) {

                    color = this.chessboard.getCell(row, column).getDOMElement().Colorz.color;

                    this.chessboard.getCell(0, column).setBorderColorTop(color);
                    this.graphicsLayer.updateBorder(this.chessboard.getCell(0, column).getDOMElement(), 'top', color);
                    break;
                }
            }


            // bordo sotto
            for (var row = this.size - 1; row >= 0; row--) {

                if (this.cellHasColor(row, column)) {

                    color = this.chessboard.getCell(row, column).getDOMElement().Colorz.color;

                    this.chessboard.getCell(this.size - 1, column).setBorderColorBottom(color);
                    this.graphicsLayer.updateBorder(this.chessboard.getCell(this.size - 1, column).getDOMElement(), 'bottom', color);
                    break;
                }
            }
        }
    };

    // questa funzione viene chiamata nel momento in cui una
    // cella viene tappata
    // semplicemente inserisce un marker se questo non c'è già
    // altrimenti lo rimuove
    Game.prototype.onTappedCell = function (row, column) {

        var cell = this.chessboard.getCell(row, column);
        var pawn;

        if (cell.isEmpty()) {

            // se la cella è vuota, settiamo semplicemente il marker
            pawn = this.pawnLeft.marker.pop();
            cell.setPawn(pawn);
            pawn.setCell(cell);
            pawn.isPlaced(true);
            this.graphicsLayer.markCell(cell.getDOMElement());

        } else {

            if (cell.getPawn().getColor() !== Pawn.MARKER) {

                // se la cella ha già una pedina e questa non è un marker
                // => non facciamo nulla
                return;
            }

            // se siamo qui, la cella contiene già un marker
            // => rimuoviamolo
            pawn = cell.getPawn();
            cell.clear();
            pawn.setCell(null);
            pawn.isPlaced(false);
            this.pawnLeft.marker.push(pawn);
            this.graphicsLayer.unmarkCell(cell.getDOMElement());
        }
    };

    // questa funzione viene chiamata nel momento in cui una NUOVA
    // pedina viene inserita nella scacchiera
    Game.prototype.pawnPlaced = function (row, column, color) {

        var cell = this.chessboard.getCell(row, column);

        if (!cell.isEmpty()) {

            // se la cella su cui p stata rilasciata la pedina non è vuota
            // => riportiamo la pedina all'inizio
            this.graphicsLayer.movePawnToStart(this.pawnLeft[color][this.pawnLeft[color].length - 1].getDOMElement());
            return;
        }

        // altrimenti piazziamo la pedina in quella cella
        var pawn = this.pawnLeft[color].pop();

        cell.setPawn(pawn);
        pawn.setCell(cell);
        pawn.isPlaced(true);

        if (this.pawnLeft[color].length === 0) {

            // qui bisogna gestire il caso in cui non ci sono più pedine da inserire
            this.graphicsLayer.updatePawnLeft(null, color, this.pawnLeft[color].length);

        } else {

            // ci sono ancora pedine da mostrare
            pawn = this.pawnLeft[color][this.pawnLeft[color].length - 1];
            this.graphicsLayer.updatePawnLeft(pawn.getDOMElement(), pawn.getColor(), this.pawnLeft[color].length);
        }

        if (this.pawnLeft.red.length === 0
                && this.pawnLeft.green.length === 0
                && this.pawnLeft.blue.length === 0) {

            this.checkSolution();
        }
    };

    // questa funzione viene chiamata nel momento in cui una pedina
    // GIA' PRESENTE SULLA SCACCHIERA viene spostata e piazzata in un'altra
    // cella
    Game.prototype.pawnMoved = function (newRow, newColumn, oldRow, oldColumn, color) {

        var oldCell = this.chessboard.getCell(oldRow, oldColumn);
        var newCell = this.chessboard.getCell(newRow, newColumn);
        var pawn = oldCell.getPawn();

        if (!newCell.isEmpty()) {

            // se la nuova cella non è già occupata
            // => riportiamo la pedina alla cella di partenza
            this.graphicsLayer.movePawnToCell(pawn.getDOMElement(), oldCell.getDOMElement());
        } else {

            this.pawnRemoved(oldRow, oldColumn, color);
            this.pawnPlaced(newRow, newColumn, color);
        }
    };

    // questa funzione viene chiamata nel momento in cui una
    // pedina viene rimossa dalla scacchiera
    Game.prototype.pawnRemoved = function (row, column, color) {

        var cell = this.chessboard.getCell(row, column);
        var pawn = cell.getPawn();

        if (this.pawnLeft[color].length !== 0) {

            // qui dobbiamo mettere la pedina appena rimossa accanto al numerino
            // mostrato per le pedine rimanenti
            // e togliere dal DOM quella che c'era al suo posto
            this.graphicsLayer.removeFromDOM(this.pawnLeft[color][this.pawnLeft[color].length - 1].getDOMElement(), color);
        }


        // ripuliamo la cella e mettiamo la pedina tra quelle da inserire
        cell.clear();
        this.pawnLeft[color].push(pawn);
        pawn.setCell(null);
        pawn.isPlaced(false);

        this.graphicsLayer.updatePawnLeft(pawn.getDOMElement(), pawn.getColor(), this.pawnLeft[color].length);
    };

    // questa funziona controlla la soluzione del
    // giocatore
    Game.prototype.checkSolution = function () {

        for (var i = 0; i < this.size; i++) {

            if (!this.checkRow(i) || !this.checkColumn(i)) {

                this.lose();
                return;
            }
        }

        // se arrivo qui allora è tutto ok
        // ed il giocatore ha trovato la soluzione
        this.win();
    };

    // questa funzione verifica che in una riga
    // ci sono 3 pedine di colori diversi
    // e che i bordi siano rispettati
    Game.prototype.checkRow = function (row) {

        var pawns = this.chessboard.getPawnsInTheRow(row);
        var red = 0;
        var green = 0;
        var blue = 0;

        for (var i = 0; i < pawns.length; i++) {

            switch (pawns[i].getColor()) {

                case Pawn.RED:
                    red++;
                    break;

                case Pawn.GREEN:
                    green++;
                    break;

                case Pawn.BLUE:
                    blue++;
                    break;
            }
        }

        if (red !== 1 || green !== 1 || blue !== 1) {

            return false;
        }


        // altrimenti il numero di pedine è corretto
        // => controlliamo i bordi
        var borders = this.chessboard.getRowBorders(row);
        var firstPawn;
        var lastPawn;

        for (var i = 0; i < pawns.length; i++) {

            // ignoriamo tutti i marker
            if (pawns[i].getColor() !== Pawn.MARKER) {

                lastPawn = pawns[i];

                if (!firstPawn) {

                    firstPawn = lastPawn;
                }
            }
        }

        return (firstPawn.getColor() === borders.left && lastPawn.getColor() === borders.right);
    };

    // come checkRow() ma per le colonne
    Game.prototype.checkColumn = function (column) {

        var pawns = this.chessboard.getPawnsInTheColumn(column);
        var red = 0;
        var green = 0;
        var blue = 0;

        for (var i = 0; i < pawns.length; i++) {

            switch (pawns[i].getColor()) {

                case Pawn.RED:
                    red++;
                    break;

                case Pawn.GREEN:
                    green++;
                    break;

                case Pawn.BLUE:
                    blue++;
                    break;
            }
        }

        if (red !== 1 || green !== 1 || blue !== 1) {

            return false;
        }


        // altrimenti il numero di pedine è corretto
        // => controlliamo i bordi
        var borders = this.chessboard.getColumnBorders(column);
        var firstPawn;
        var lastPawn;

        for (var i = 0; i < pawns.length; i++) {

            // ignoriamo tutti i marker
            if (pawns[i].getColor() !== Pawn.MARKER) {

                lastPawn = pawns[i];

                if (!firstPawn) {

                    firstPawn = lastPawn;
                }

            }
        }

        return (firstPawn.getColor() === borders.top && lastPawn.getColor() === borders.bottom);
    };

    Game.prototype.lose = function () {

        this.pause();
        this.graphicsLayer.showLoseDialog();
    };

    Game.prototype.win = function () {

        this.pause();
        this.graphicsLayer.showWinDialog();
    };

    Game.prototype.pause = function () {

        this.graphicsLayer.removeHandler();
    };

    Game.prototype.resume = function () {

        this.graphicsLayer.addHandler();
    };

    Game.prototype.exit = function () {

        this.graphicsLayer.destroy();
        this.destroy();
        Backbone.history.history.back();
    };

    // questa funzione viene chiamata nel momento in cui il gioco
    // viene chiuso.
    // Si occupa di cancellare tutti i riferimenti e gli handler
    Game.prototype.destroy = function () {

        // dereferenziamo le variabili
//        this.size = null;
//        this.chessboard = null;
//        this.pawnLeft = null;
//        this.pawnLeft.red = null;
//        this.pawnLeft.green = null;
//        this.pawnLeft.blue = null;
//        this.pawnLeft.marker = null;
//        this.graphicsLayer = null;
//        this.tappedCell = null;
    };

    Game.prototype.bindAll = function () {

        for (var prop in this) {

            if (typeof this[prop] === 'function') {

                this[prop] = this[prop].bind(this);
            }

        }
    };


    // esponiamo pubblicamente il modulo
    return Game;

});


