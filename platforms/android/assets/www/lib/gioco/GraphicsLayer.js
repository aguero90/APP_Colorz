
var GraphicsLayer = function (game) {

    this.game = game;
};
GraphicsLayer.prototype = {
    init: function (timeLeft) {

        this.bindAll();
        this.polyFillRequestAnimationFrame();

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

        // inizializziamo il drag & drop con interact
        // rendiamo "draggabili" tutti gli elementi che hanno classe "draggable"
        interact('.draggable').draggable({
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
        interact('.dropzone')
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

        // aggiungiamo handler ai bottoni del winDialog
        interact(this.winDialogNewGameButton).on('tap', this.onTapNewGameWin);
        interact(this.loseDialogContinueButton).on('tap', this.onTapContinueLose);
        interact(this.loseDialogNewGameButton).on('tap', this.onTapNewGameLose);
        interact(this.exitDialogExitButton).on('tap', this.onTapExit);
        interact(this.exitDialogContinueButton).on('tap', this.onTapContinueExit);
        document.addEventListener("backbutton", this.onBackButton);

        if (timeLeft) {


            this.timer = document.getElementById("Timer");
            this.isTimerRunning = null;

            this.TimeUpDialog = document.getElementById("TimeUp");
            this.TimeUpDialogNewGameButton = document.getElementById("NewGameTimeUp");

            interact(this.TimeUpDialogNewGameButton).on('tap', this.onTapNewGameTimeUp);

            // inizializziamo il timer;
            this.timer.innerHTML = this.formatTime(timeLeft);
        }


    },
    updatePawnLeft: function (element, color, value) {

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
    },
    updateBorder: function (cell, position, color) {

        cell.addClass("Chessboard-border--" + position + "--" + color);
    },
    clearBorder: function (cell) {

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
    },
    removeFromDOM: function (element) {

        element.removeClass("visible");
    },
    movePawnToStart: function (pawn) {

        pawn.style.webkitTransition = pawn.style.transition = 'transform .3s ease';
        // se l'utente non ha inserito la pedina in una cella
        // => la riportiamo al posto di partenza
        pawn.style.webkitTransform = pawn.style.transform = 'translate(0px, 0px)';
        // ripristiniamo anche i dati per il movimento
        pawn.setAttribute('data-x', 0);
        pawn.setAttribute('data-y', 0);
    },
    movePawnToCell: function (pawn, cell) {

        var rect = cell.getBoundingClientRect();
        var x = rect.left + (rect.width / 2) - parseFloat(pawn.getAttribute('data-startX'));
        var y = rect.top + (rect.height / 2) - parseFloat(pawn.getAttribute('data-startY'));
        // se l'utente non ha inserito la pedina in una cella
        // => la riportiamo al posto di partenza
        pawn.style.webkitTransform = pawn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        // ripristiniamo anche i dati per il movimento
        pawn.setAttribute('data-x', x);
        pawn.setAttribute('data-y', y);
    },
    markCell: function (cell) {

        cell.addClass("Chessboard-cell--marker");
    },
    unmarkCell: function (cell) {

        cell.removeClass("Chessboard-cell--marker");
    },
    updateTimer: function (dt) {

        var now = new Date().getTime();


        if (now >= this.game.endTime) {

            // diciamo al gioco che il tempo è scaduto
            this.game.timeUp();
            // ritorniamo false per bloccare il loop
            return false;
        }

        // aggiorniamo il timer
        this.timer.innerHTML = this.formatTime(this.game.endTime - now);

        return this.isTimerRunning;
    },
    animLoop: function (render, element) {

        var running, lastFrame = new Date().getTime();
        function loop(now) {

            // stop the loop if render returned false
            if (running !== false) {

                requestAnimationFrame(loop, element);
                var dt = now - lastFrame;
                // do not render frame when dt is too high
                if (dt < 160) {

                    running = render(dt);
                }

                lastFrame = now;
            }
        }

        loop(lastFrame);
    },
    startTimer: function () {

        this.isTimerRunning = true;
        this.animLoop(this.updateTimer.bind(this));
    },
    stopTimer: function () {

        this.isTimerRunning = false;
    },
    formatTime: function (time) {

        // time è un intero che indica i millisecondi
        var s = Math.floor(time / 1000);
        var m = Math.floor(s / 60);
        s = s % 60;
        if (m < 10) {
            m = "0" + m;
        }

        if (s < 10) {
            s = "0" + s;
        }

        return m + ":" + s;
    },
    // questa funzione determina cosa avviene nel momento
    // in cui parte il drag
    onDragStart: function (e) {

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
    },
    // questa funzione determina cosa avviene mentre
    // l'oggetto si sta muovendo
    onDragMove: function (e) {

        // salviamo i dati relativi alla X ed alla Y dell'oggetto
        var x = (parseFloat(e.target.getAttribute('data-x')) || 0) + e.dx;
        var y = (parseFloat(e.target.getAttribute('data-y')) || 0) + e.dy;
        // trasliamolo
        e.target.style.webkitTransform = e.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        // aggiorniamo gli attributi della X e della Y
        e.target.setAttribute('data-x', x);
        e.target.setAttribute('data-y', y);
    },
    // questa funzione determina cosa avviene quando
    // l'oggetto è stato droppato
    onDragEnd: function (e) {

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
    },
    // Questa funzione determina cosa avviene nel momento in cui
    // è possibile droppare un elemento
    onDropActivate: function (e) {

        // aggiungere feedback eventuali
    },
    // Questa funzione determina cosa avviene nel momento in cui
    // non è più possibile droppare un elemento
    onDropDeactivate: function (e) {

        // rimuovere feedback eventualmente aggiunti nella
        // ondropactivate
    },
    // Questa funzione determina cosa avviene nel momento in cui
    // un elemento draggabile entra nell'area di drop
    onDragEnter: function (e) {

        // var draggableElement = event.relatedTarget;
        // var dropzoneElement = event.target;

        // mostriamo all'utente che è possibile effettuare il drop
    },
    // Questa funzione determina cosa avviene nel momento in cui
    // un elemento draggabile esce dall'area di drop
    onDragLeave: function (e) {

        // rimuoviamo il feedback creato per far capire all'utente
        // che non è più possibile effetuare il drop

    },
    // Questa funzione determina cosa avviene nel momento in cui
    // l'elemento draggabile viene droppato
    onDrop: function (e) {

        this.movePawnToCell(e.relatedTarget, e.target);
        if (e.relatedTarget.Colorz.row != undefined) {

            // la pedina era già nella scacchiera
            this.game.pawnMoved(e.target.Colorz.row, e.target.Colorz.column,
                    e.relatedTarget.Colorz.row, e.relatedTarget.Colorz.column, e.relatedTarget.Colorz.color);
        } else {

            // è stata posizionata una nuova pedina
            this.game.pawnPlaced(e.target.Colorz.row, e.target.Colorz.column, e.relatedTarget.Colorz.color);
        }

    },
    // questa funziona cosa avviene nel momento in cui viene tappata una
    // cella
    onTappedCell: function (e) {

        e.currentTarget.toggleClass("Chessboard-cell--marker");
        this.game.onTappedCell(e.currentTarget.Colorz.row, e.currentTarget.Colorz.column);
    },
    // questa funzione viene chiamata nel momento in cui il gioco
    // viene chiuso.
    // Si occupa di cancellare tutti i riferimenti e gli handler
    onTapNewGameWin: function (e) {

        this.winDialog.addClass("is-hidden");

        // NON MI PIACE PROPRIO INSERIRE QUI QUESTO
        // PEZZO DI LOGICA xD
        //
        // Comunque, se siamo in un livello => usciamo
        // altrimenti creiamo una nuova partita
        this.game.level ? this.game.exit() : this.game.restart();

    },
    onTapContinueLose: function (e) {

        this.loseDialog.addClass("is-hidden");
        this.game.resume();

    },
    onTapNewGameLose: function (e) {

        this.loseDialog.addClass("is-hidden");
        this.game.restart();

    },
    onTapNewGameTimeUp: function (e) {

        this.TimeUpDialog.addClass("is-hidden");
        this.game.restart();
    },
    onTapExit: function (e) {

        this.game.exit();
    },
    onTapContinueExit: function (e) {

        this.exitDialog.addClass("is-hidden");
        this.game.resume();

    },
    onBackButton: function (e) {

        this.game.pause();
        this.exitDialog.removeClass("is-hidden");
    },
    destroy: function () {

        // rimuoviamo gli handler
        interact('.draggable').unset();
        interact('.dropzone').unset();
        // NOTA: prima di rimuoverli dovremmo metterli tutti come funzioni
        interact(this.winDialogNewGameButton).unset();
        interact(this.loseDialogContinueButton).unset();
        interact(this.loseDialogNewGameButton).unset();
        interact(this.exitDialogExitButton).unset();
        interact(this.exitDialogContinueButton).unset();
        document.removeEventListener("backbutton", this.onBackButton);

        // dereferenziamo le variabili
//        this.game =
//                this.pawnLeftRedContainer =
//                this.pawnLeftGreenContainer =
//                this.pawnLeftBlueContainer =
//                this.winDialog =
//                this.winDialogClose =
//                this.winDialogNewGameButton =
//                this.loseDialog =
//                this.loseDialogClose =
//                this.loseDialogContinueButton =
//                this.loseDialogNewGameButton =
//                this.exitDialogExitButton =
//                this.exitDialogContinueButton =
//                this.timer =
//                this.isTimerRunning = null;
    },
    // questa funzione permette di legare tutte le esecuzione al
    // contesto "this". In questo modo anche le callback degli eventi
    // avranno come contesto l'oggetto in questione e non window
    bindAll: function () {

        for (var prop in this) {

            if (typeof this[prop] === 'function') {

                this[prop] = this[prop].bind(this);
            }

        }
    },
    // questa funzione è un polyfill preso su https://gist.github.com/paulirish/1579671
    // della requestAnimationFrame() poiche non è supportata da tutti i browser
    // http://caniuse.com/#search=requestAnimationFrame
    // ( nel nostro caso è necessaria la compatibilità con android <= 4.3 )
    //
    // Questa funzione la implementa attraverso setTimeout
    polyFillRequestAnimationFrame: function () {

        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                        timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }

    }
};


