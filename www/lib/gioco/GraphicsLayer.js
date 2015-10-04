
define(function (require) {

    // impostiamo le dipendenze
    var Interact = require("interact");

    var GraphicsLayer = function (game) {

        this.game = game;
    };

    GraphicsLayer.prototype.init = function () {

        this.bindAll();

        // prendiamo tutti i riferimenti agli elementi del DOM che ci servono
        this.pawnLeftRedContainer = document.getElementById("PawnLeft-dummyContainer--red");
        this.pawnLeftGreenContainer = document.getElementById("PawnLeft-dummyContainer--green");
        this.pawnLeftBlueContainer = document.getElementById("PawnLeft-dummyContainer--blue");

        this.winDialog = document.getElementById("WinDialog");
        this.winDialogClose = document.getElementById("WinDialog-close");
        this.winDialogNewGameButton = document.getElementById("NewGameWin");


        this.loseDialog = document.getElementById("LoseDialog");
        this.loseDialogClose = document.getElementById("LoseDialog-close");
        this.loseDialogContinueButton = document.getElementById("ContinueTheGame");
        this.loseDialogNewGameButton = document.getElementById("NewGameLose");

        this.exitDialog = document.getElementById("ExitDialog");
        this.exitDialogExitButton = document.getElementById("Exit");
        this.exitDialogContinueButton = document.getElementById("ReturnToGame");

        for (var i = 0; i < this.game.size; i++) {

            this.pawnLeftRedContainer.appendChild(this.game.pawnLeft["red"][i].getDOMElement());
            this.pawnLeftGreenContainer.appendChild(this.game.pawnLeft["green"][i].getDOMElement());
            this.pawnLeftBlueContainer.appendChild(this.game.pawnLeft["blue"][i].getDOMElement());
        }

        this.game.pawnLeft["red"][this.game.size - 1].getDOMElement().addClass("visible");
        this.game.pawnLeft["green"][this.game.size - 1].getDOMElement().addClass("visible");
        this.game.pawnLeft["blue"][this.game.size - 1].getDOMElement().addClass("visible");


        this.addHandler();

        // aggiungiamo gli handler da non rimuovere mai
        Interact(this.winDialogNewGameButton).on('tap', this.onTapNewGameWin);
        Interact(this.loseDialogContinueButton).on('tap', this.onTapContinueLose);
        Interact(this.loseDialogNewGameButton).on('tap', this.onTapNewGameLose);
        Interact(this.exitDialogExitButton).on('tap', this.onTapExit);
        Interact(this.exitDialogContinueButton).on('tap', this.onTapContinueExit);

    };

    GraphicsLayer.prototype.addHandler = function () {

        // inizializziamo il drag & drop con interact
        // rendiamo "draggabili" tutti gli elementi che hanno classe "draggable"
        Interact('.draggable').draggable({
            restrict: {
                endOnly: true,
                elementRect: {top: 0, left: 0, bottom: 1, right: 1}
            },
            onstart: this.onDragStart,
            onmove: this.onDragMove,
            onend: this.onDragEnd
        });

        // rendiamo "droppabili" le celle delle tabella
        // diciamo che tutti gli elementi che hanno come classe "dropzone"
        // possono accettare tutti gli elementi draggabili che hanno come
        // classe "draggable"
        Interact('.dropzone')
                .dropzone({
                    accept: '.draggable',
                    ondropactivate: this.onDropActivate,
                    ondropdeactivate: this.onDropDeactivate,
                    ondragenter: this.onDragEnter,
                    ondragleave: this.onDragLeave,
                    ondrop: this.onDrop
                })
                // aggiungiamo handler alla scacchiera
                // cioè al tap su una cella deve accadere qualcosa
                .on('tap', this.onTappedCell);


        document.addEventListener("backbutton", this.onBackButton);
    };

    GraphicsLayer.prototype.removeHandler = function () {


        Interact('.draggable').unset();
        Interact('.dropzone').unset();

        document.removeEventListener("backbutton", this.onBackButton);
    };

    GraphicsLayer.prototype.updatePawnLeft = function (element, color, value) {

        /*
         * <NOTA>: al momento gestisce solo il caso in cui una pedina viene
         *         aggiunta alla scacchiera ma non quando viene rimossa
         */

        // aggiorniamo la grafica delle pedine restanti
        document.getElementById("PawnLeft--" + color + "-text").innerHTML = "x" + value;
        // effetuiamo questo controllo poichè l'elemento potrebbe non esserci
        // ad esempio quando il valore delle pedine rimaste è 0
        if (value !== 0) {
            // mostriamo la nuova pedina
            element.addClass("visible");
            // ed in caso rimuoviamo il placeholder
            document.getElementById("PawnLeft--placeholder--" + color).removeClass("visible");
        } else {

            // se la quantità di pedine rimaste è 0
            // mettiamo il placeholder
            document.getElementById("PawnLeft--placeholder--" + color).addClass("visible");
        }
    };

    GraphicsLayer.prototype.updateBorder = function (cell, position, color) {

        cell.addClass("Chessboard-border--" + position + "--" + color);
    };

    GraphicsLayer.prototype.clearBorder = function (cell) {

        // non ci interessa quale sia il bordo in questione.
        // ripuliamo tutto
        cell.removeClass("Chessboard-border--top--red");
        cell.removeClass("Chessboard-border--top--green");
        cell.removeClass("Chessboard-border--top--blue");
        cell.removeClass("Chessboard-border--right--red");
        cell.removeClass("Chessboard-border--right--green");
        cell.removeClass("Chessboard-border--right--blue");
        cell.removeClass("Chessboard-border--bottom--red");
        cell.removeClass("Chessboard-border--bottom--green");
        cell.removeClass("Chessboard-border--bottom--blue");
        cell.removeClass("Chessboard-border--left--red");
        cell.removeClass("Chessboard-border--left--green");
        cell.removeClass("Chessboard-border--left--blue");
    };

    GraphicsLayer.prototype.removeFromDOM = function (element) {

        element.removeClass("visible");
    };

    GraphicsLayer.prototype.movePawnToStart = function (pawn) {

        pawn.style.webkitTransition = pawn.style.transition = 'transform .3s ease';
        // se l'utente non ha inserito la pedina in una cella
        // => la riportiamo al posto di partenza
        pawn.style.webkitTransform = pawn.style.transform = 'translate(0px, 0px)';
        // ripristiniamo anche i dati per il movimento
        pawn.setAttribute('data-x', 0);
        pawn.setAttribute('data-y', 0);
    };

    GraphicsLayer.prototype.movePawnToCell = function (pawn, cell) {

        var rect = cell.getBoundingClientRect();
        var x = rect.left + (rect.width / 2) - parseFloat(pawn.getAttribute('data-startX'));
        var y = rect.top + (rect.height / 2) - parseFloat(pawn.getAttribute('data-startY'));
        // se l'utente non ha inserito la pedina in una cella
        // => la riportiamo al posto di partenza
        pawn.style.webkitTransform = pawn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        // ripristiniamo anche i dati per il movimento
        pawn.setAttribute('data-x', x);
        pawn.setAttribute('data-y', y);
    };

    // questa funzione determina cosa avviene nel momento
    // in cui parte il drag
    GraphicsLayer.prototype.onDragStart = function (e) {

        // l'oggetto che stiamo muovendo deve stare più in alto
        // di tutti
        e.target.style["z-index"] = 9;
        // resettiamo la posizione dell'oggetto
        e.target.style.webkitTransition = e.target.style.transition = '';
        // prendiamo le coordinate del centro dell'oggetto che stiamo droppando
        // ma lo facciamo solo al primo drag
        if (!e.target.getAttribute('data-startX')) {

            // tramite la funzione getBoundingRect()
            // possiamo determinare la X, la Y la width e la height
            // dell'oggetto
            var rect = e.target.getBoundingClientRect();
            e.target.setAttribute('data-startX', rect.left + (rect.width / 2));
            e.target.setAttribute('data-startY', rect.top + (rect.height / 2));
        }
    };

    // questa funzione determina cosa avviene mentre
    // l'oggetto si sta muovendo
    GraphicsLayer.prototype.onDragMove = function (e) {

        // salviamo i dati relativi alla X ed alla Y dell'oggetto
        var x = (parseFloat(e.target.getAttribute('data-x')) || 0) + e.dx;
        var y = (parseFloat(e.target.getAttribute('data-y')) || 0) + e.dy;
        // trasliamolo
        e.target.style.webkitTransform = e.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        // aggiorniamo gli attributi della X e della Y
        e.target.setAttribute('data-x', x);
        e.target.setAttribute('data-y', y);
    };

    // questa funzione determina cosa avviene quando
    // l'oggetto è stato droppato
    GraphicsLayer.prototype.onDragEnd = function (e) {

        // rimettiamo alla vecchia z-index
        e.target.style["z-index"] = null;
        // vediamo dove ha droppato l'elemento l'utente
        if (!e.interaction.dropElement || !e.interaction.dropElement.hasClass("dropzone")) {

            if (e.target.Colorz.row != undefined) {

                // l'elemento era sulla scacchiera mentre ora lo stiamo tirando fuori
                this.game.pawnRemoved(e.target.Colorz.row, e.target.Colorz.column, e.target.Colorz.color);
            }

            this.movePawnToStart(e.target);
        } else {

            // se ha droppato in una cella
            // => facciamo una transizione più breve
            e.target.style.webkitTransition = e.target.style.transition = 'transform .1s ease';
        }
    };

    // Questa funzione determina cosa avviene nel momento in cui
    // è possibile droppare un elemento
    GraphicsLayer.prototype.onDropActivate = function (e) {

        // aggiungere feedback eventuali
    };

    // Questa funzione determina cosa avviene nel momento in cui
    // non è più possibile droppare un elemento
    GraphicsLayer.prototype.onDropDeactivate = function (e) {

        // rimuovere feedback eventualmente aggiunti nella
        // ondropactivate
    };

    // Questa funzione determina cosa avviene nel momento in cui
    // un elemento draggabile entra nell'area di drop
    GraphicsLayer.prototype.onDragEnter = function (e) {

        // var draggableElement = event.relatedTarget;
        // var dropzoneElement = event.target;

        // mostriamo all'utente che è possibile effettuare il drop
    };

    // Questa funzione determina cosa avviene nel momento in cui
    // un elemento draggabile esce dall'area di drop
    GraphicsLayer.prototype.onDragLeave = function (e) {

        // rimuoviamo il feedback creato per far capire all'utente
        // che non è più possibile effetuare il drop

    };

    // Questa funzione determina cosa avviene nel momento in cui
    // l'elemento draggabile viene droppato
    GraphicsLayer.prototype.onDrop = function (e) {

        this.movePawnToCell(e.relatedTarget, e.target);
        if (e.relatedTarget.Colorz.row != undefined) {

            // la pedina era già nella scacchiera
            this.game.pawnMoved(e.target.Colorz.row, e.target.Colorz.column,
                    e.relatedTarget.Colorz.row, e.relatedTarget.Colorz.column, e.relatedTarget.Colorz.color);
        } else {

            // è stata posizionata una nuova pedina
            this.game.pawnPlaced(e.target.Colorz.row, e.target.Colorz.column, e.relatedTarget.Colorz.color);
        }
    };

    // questa funziona cosa avviene nel momento in cui viene tappata una
    // cella
    GraphicsLayer.prototype.onTappedCell = function (e) {

        this.game.onTappedCell(e.currentTarget.Colorz.row, e.currentTarget.Colorz.column);
    };

    GraphicsLayer.prototype.markCell = function (cell) {

        cell.addClass("Chessboard-cell--marker");
    };

    GraphicsLayer.prototype.unmarkCell = function (cell) {

        cell.removeClass("Chessboard-cell--marker");
    };

    // questa funzione viene chiamata nel momento in cui il gioco
    // viene chiuso.
    // Si occupa di cancellare tutti i riferimenti e gli handler
    GraphicsLayer.prototype.onTapNewGameWin = function (e) {

        this.winDialog.addClass("is-hidden");
    };

    GraphicsLayer.prototype.onTapContinueLose = function (e) {

        this.loseDialog.addClass("is-hidden");
        this.game.resume();
    };

    GraphicsLayer.prototype.onTapNewGameLose = function (e) {

        this.loseDialog.addClass("is-hidden");
        this.game.restart();
    };

    GraphicsLayer.prototype.onTapExit = function (e) {

        this.game.exit();
    };

    GraphicsLayer.prototype.onTapContinueExit = function (e) {

        this.exitDialog.addClass("is-hidden");
        this.game.resume();
    };

    GraphicsLayer.prototype.onBackButton = function (e) {

        this.game.pause();
        this.exitDialog.removeClass("is-hidden");
    };

    GraphicsLayer.prototype.showLoseDialog = function () {

        this.loseDialog.removeClass("is-hidden");
    };

    GraphicsLayer.prototype.showWinDialog = function () {

        this.winDialog.removeClass("is-hidden");
    };

    GraphicsLayer.prototype.destroy = function () {

        // rimuoviamo gli handler
        Interact('.draggable').unset();
        Interact('.dropzone').unset();
        // NOTA: prima di rimuoverli dovremmo metterli tutti come funzioni
        Interact(this.winDialogNewGameButton).unset();
        Interact(this.loseDialogContinueButton).unset();
        Interact(this.loseDialogNewGameButton).unset();
        Interact(this.exitDialogExitButton).unset();
        Interact(this.exitDialogContinueButton).unset();
        document.removeEventListener("backbutton", this.onBackButton);

        // dereferenziamo le variabili
//        this.game = null;
//        this.pawnLeftRedContainer = null;
//        this.pawnLeftGreenContainer = null;
//        this.pawnLeftBlueContainer = null;
//        this.winDialog = null;
//        this.winDialogClose = null;
//        this.winDialogNewGameButton = null;
//        this.loseDialog = null;
//        this.loseDialogClose = null;
//        this.loseDialogContinueButton = null;
//        this.loseDialogNewGameButton = null;
//        this.exitDialogExitButton = null;
//        this.exitDialogContinueButton = null;
    };

    // questa funzione permette di legare tutte le esecuzione al
    // contesto "this". In questo modo anche le callback degli eventi
    // avranno come contesto l'oggetto in questione e non window
    GraphicsLayer.prototype.bindAll = function () {

        for (var prop in this) {

            if (typeof this[prop] === 'function') {

                this[prop] = this[prop].bind(this);
            }

        }
    };

    // esponiamo pubblicamente il modulo
    return GraphicsLayer;

});


