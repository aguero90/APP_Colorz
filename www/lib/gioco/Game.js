
function Game(size) {

    MyUtils.enhanceDOMElements();


    this.size = size;
    this.chessboard = new Chessboard(size, document.getElementById("Chessboard"));


    this.pawnLeft = {
        red: [],
        green: [],
        blue: [],
        marker: []
    };

    for (var i = 0; i < size; i++) {

        this.pawnLeft.red.push(new Pawn(Pawn.RED));
        this.pawnLeft.green.push(new Pawn(Pawn.GREEN));
        this.pawnLeft.blue.push(new Pawn(Pawn.BLUE));
    }


    // i marker al massimo possono essere in tutte le caselle (size * size)
    // meno quelle in cui ci vanno le pedine (size * 3)
    for (var i = 0; i < (size * size) - (size * 3); i++) {

        this.pawnLeft.marker.push(new Pawn(Pawn.MARKER));
    }

    this.colorSelectionContainer = document.getElementById("ColorSelectionContainer");
}

Game.prototype = {
    tappedCell: null,
    start: function () {

        console.log("game.start()");
        this.createLevel();
        this.addHandler();
    },
    createLevel: function () {

        this.generateSolution();
        this.generateBorderFromSolution();
        this.resetSolution();
    },
    resetSolution: function () {

        for (var row = 0; row < this.size; row++) {

            for (var column = 0; column < this.size; column++) {

                delete this.chessboard.getCell(row, column).getDOMElement().Colorz.color;
            }
        }
    },
    cellHasColor: function (row, column) {

        return this.chessboard.getCell(row, column).getDOMElement().Colorz.color;
    },
    colorInColumn: function (color, column) {

        for (var row = 0; row < this.size; row++) {

            if (this.chessboard.getCell(row, column).getDOMElement().Colorz.color === color) {

                return true;
            }
        }

        return false;
    },
    generateSolution: function () {

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
                        this.resetSolution();
                        this.createLevel();
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
                this.chessboard.getCell(row, randomPosition).getDOMElement().addClass("Chessboard-cell--" + randomColor);
            }
        }
    },
    generateBorderFromSolution: function () {

        // facciamo prima il bordo sinistro e destro
        for (var row = 0; row < this.size; row++) {

            // bordo sinistro
            for (var column = 0; column < this.size; column++) {

                if (this.cellHasColor(row, column)) {

                    this.chessboard.getCell(row, 0).setBorderColorLeft(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;
                }
            }

            // bordo destro
            for (var column = this.size - 1; column >= 0; column--) {

                if (this.cellHasColor(row, column)) {

                    this.chessboard.getCell(row, this.size - 1).setBorderColorRight(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;
                }
            }
        }

        // facciamo ora bordo sopra e sotto
        for (var column = 0; column < this.size; column++) {

            // bordo sopra
            for (var row = 0; row < this.size; row++) {

                if (this.cellHasColor(row, column)) {

                    this.chessboard.getCell(0, column).setBorderColorTop(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;
                }
            }


            // bordo sotto
            for (var row = this.size - 1; row >= 0; row--) {

                if (this.cellHasColor(row, column)) {

                    this.chessboard.getCell(this.size - 1, column).setBorderColorBottom(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;
                }
            }
        }
    },
    addHandler: function () {

        // aggiungiamo handler alla scacchiera
        // cioè al click su una cella deve accadere qualcosa

        for (var row = 0; row < this.size; row++) {

            for (var column = 0; column < this.size; column++) {

                this.chessboard.getCell(row, column).getDOMElement().addEventListener("click", this.showColorSelection.bind(this));
            }
        }


        // aggiungiamo handler alla selezione dei colori
        document.getElementById("ColorSelection-red").addEventListener("click", this.colorSelected.bind(this, Pawn.RED));
        document.getElementById("ColorSelection-green").addEventListener("click", this.colorSelected.bind(this, Pawn.GREEN));
        document.getElementById("ColorSelection-blue").addEventListener("click", this.colorSelected.bind(this, Pawn.BLUE));
        document.getElementById("ColorSelection-marker").addEventListener("click", this.colorSelected.bind(this, Pawn.MARKER));

        // aggiungiamo handler al container per la selezione dei colori
        this.colorSelectionContainer.addEventListener("click", function (e) {

            if (this === e.target) {
                this.addClass("is-hidden");
            }
        });
    },
    showColorSelection: function (e) {

        console.log("ShowColorSelection");
        this.colorSelectionContainer.removeClass("is-hidden");

        this.tappedCell = this.chessboard.getCell(e.target.Colorz.row, e.target.Colorz.column);
    },
    colorSelected: function (color, e) {

        var pawn;

        if (!this.tappedCell.isEmpty()) {

            // se la cella che è stata tappata non è vuota
            // devo rimuovere la pedina già inserita

            pawn = this.tappedCell.getPawn();

            // reinseriamo la pedina da rimuovere tra quelle che possono
            // essere piazzate
            this.pawnLeft[pawn.getColor()].push(pawn);

            if (pawn.getColor() !== Pawn.MARKER) {

                // aggiorniamo la grafica delle pedine restanti
                document.getElementById("PawnLeft--" + pawn.getColor()).innerHTML = "x" + this.pawnLeft[pawn.getColor()].length;
            }

            // rimuoviamo la pedina dalla cella
            this.tappedCell.clear();
        }



        if (this.pawnLeft[color].length === 0) {

            // se non si possono più mettere pedine da inserire
            // non faccio nulla
            return;
        }

        // prendiamo la pedina in questione tra quelle disponibili
        this.tappedCell.setPawn(this.pawnLeft[color].pop());


        if (color !== Pawn.MARKER) {

            // aggiorniamo la grafica delle pedine restanti
            document.getElementById("PawnLeft--" + color).innerHTML = "x" + this.pawnLeft[color].length;
        }


        if (this.pawnLeft[color].length === 0) {

            // mostriamo che non è più possibile selezionare quel
            // tipo di pedina
            document.getElementById("PawnLeft--" + color).addClass("is-disabled");
        }

        // nascondiamo il popup contenente le pedine da scegliere
        document.getElementById("ColorSelectionContainer").addClass("is-hidden");

        if (this.pawnLeft.red.length <= 0
                && this.pawnLeft.green.length <= 0
                && this.pawnLeft.blue.length <= 0) {

            // se sono state inserite tutte le pedine
            // => si controlla la soluzione
            this.checkSolution();
        }
    },
    checkSolution: function () {

        var pawns;
        var red, green, blue;

        // controlliamo se ogni riga ed ogni colonna ha 3 pedine di colori diversi
        //
        // facciamo prima per ogni riga
        for (var i = 0; i < this.size; i++) {

            pawns = this.chessboard.getPawnsInTheRow(i);
            red = green = blue = 0;

            for (var j = 0; j < pawns.length; j++) {

                switch (pawns[j].getColor()) {

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
                alert("la riga " + i + " non ha una pedina per ogni colore");
                return;
            }
        }

        // poi per ogni colonna
        for (var i = 0; i < this.size; i++) {

            pawns = this.chessboard.getPawnsInTheColumn(i);
            // resettiamo i contatori
            red = green = blue = 0;

            for (var j = 0; j < pawns.length; j++) {

                switch (pawns[j].getColor()) {

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
                alert("la colonna " + i + " non ha una pedina per ogni colore");
                return;
            }
        }


        // ora controlliamo i bordi
        var borders;

        // controlliamo prima le righe
        for (var row = 0; row < this.size; row++) {

            pawns = this.chessboard.getPawnsInTheRow(row);
            borders = this.chessboard.getRowBorders(row);

            for (var i = 0; i < pawns.length; i++) {

                if (pawns[i].getColor() !== Pawn.MARKER) {

                    if (pawns[i].getColor() !== borders.left) {
                        alert("il bordo sinistro della riga " + (row + 1) + " non coincide");
                        return;
                    } else {
                        break;
                    }
                }
            }

            for (var i = pawns.length - 1; i >= 0; i--) {

                if (pawns[i].getColor() !== Pawn.MARKER) {

                    if (pawns[i].getColor() !== borders.right) {
                        alert("il bordo destro della riga " + (row + 1) + " non coincide");
                        return;
                    } else {
                        break;
                    }
                }
            }
        }

        // controlliamo le colonne
        for (var column = 0; column < this.size; column++) {

            pawns = this.chessboard.getPawnsInTheColumn(column);
            borders = this.chessboard.getColumnBorders(column);


            for (var i = 0; i < pawns.length; i++) {

                if (pawns[i].getColor() !== Pawn.MARKER) {

                    if (pawns[i].getColor() !== borders.top) {
                        alert("il bordo superiore della colonna " + (column + 1) + " non coincide");
                        return;
                    } else {
                        break;
                    }
                }
            }

            for (var i = pawns.length - 1; i >= 0; i--) {

                if (pawns[i].getColor() !== Pawn.MARKER) {

                    if (pawns[i].getColor() !== borders.bottom) {
                        alert("il bordo inferiore della colonna " + (column + 1) + " non coincide");
                        return;
                    } else {
                        break;
                    }
                }
            }
        }

        // se arrivo qui allora è tutto ok
        // ed il giocatore ha trovato la soluzione
        alert("Hai vinto");

    }
};


