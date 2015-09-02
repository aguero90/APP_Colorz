
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
        // this.resetSolution();
    },
    clearChessboard: function () {

        for (var row = 0; row < this.size; row++) {
            for (var column = 0; column < this.size; column++) {
                delete this.chessboard.getCell(row, column).getDOMElement().Colorz.color;
            }
        }
    },
    generateSolution: function () {

        var colorLeft;
        var positionLeft;
        var randomColor;
        var randomPosition;
        var rowToCheck;

        for (var row = 0; row < this.size; row++) {


            colorLeft = ["red", "green", "blue"];

            // finchè non ho inserito tutti i colori
            while (colorLeft.length > 0) {

                positionLeft = [0, 1, 2, 3, 4, 5];

                // tra i colori da scegliere ne prendiamo uno a caso rimuovendolo
                // dall'array
                randomColor = colorLeft.splice((Math.random() * 1000) % colorLeft.length, 1)[0];

                do {
                    /* <PURTROPPO QUESTO ALGORITMO NON GENERA SEMPRE UNA SOLUZIONE CORRETTA>
                     * <QUANDO CIO' AVVIENE, L'ARRAY DELLE POSIZIONI SARA' VUOTO E QUINDI POSIZIONE>
                     * <SARA' undefined>
                     */

                    if (positionLeft.length === 0) {
                        this.clearChessboard(); // DA FARE: prima di riprovare a generare una soluzione faccio piazza pulita
                        this.createLevel();
                        return;
                    }

                    rowToCheck = 0;

                    // tra le posizioni da scegliere ne prendiamo una a caso rimuovendola
                    // dall'array
                    randomPosition = positionLeft.splice((Math.random() * 1000) % positionLeft.length, 1)[0];


                    if (this.chessboard.getCell(row, randomPosition).getDOMElement().Colorz.color) {

                        // se nella posizione che ho scelto c'è già un colore,
                        // non faccio nulla
                        continue;
                    }


                    /* controllo se in quella colonna c'è già il colore scelto */
                    while (rowToCheck < row) {
                        if (this.chessboard.getCell(row, randomPosition).getDOMElement().Colorz.color
                                && this.chessboard.getCell(row, randomPosition).getDOMElement().Colorz.color === randomColor) {

                            // se ho trovato lo stesso colore sulla colonna
                            // non posso posizionare il colore
                            // perciò esco
                            break;
                        }
                        rowToCheck++;
                    }

                } while (rowToCheck !== row);


                // sono uscito dal while perché ho trovato dove posizionare il colore
                // inserisco il colore nella posizione trovata
                // e dico che ora quella cella è colorata
                this.chessboard.getCell(row, randomPosition).getDOMElement().Colorz.color = randomColor;
            }
        }
    },
    generateBorderFromSolution: function () {

        // facciamo prima il bordo sinistro e destro
        for (var row = 0; row < this.size; row++) {

            // bordo sinistro
            for (var column = 0; column < this.size; column++) {

                if (this.chessboard.getCell(row, column).getDOMElement().Colorz.color) {

                    this.chessboard.getCell(row, 0).setBorderColorLeft(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;

                }
            }

            // bordo destro
            for (var column = this.size - 1; column >= 0; column--) {

                if (this.chessboard.getCell(row, column).getDOMElement().Colorz.color) {

                    this.chessboard.getCell(row, this.size - 1).setBorderColorRight(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;
                }
            }
        }

        // facciamo ora bordo sopra e sotto
        for (var column = 0; column < this.size; column++) {

            // bordo sopra
            for (var row = 0; row < this.size; row++) {

                if (this.chessboard.getCell(row, column).getDOMElement().Colorz.color) {

                    this.chessboard.getCell(0, column).setBorderColorTop(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;

                }
            }


            // bordo sotto
            for (var row = this.size - 1; row >= 0; row--) {

                if (this.chessboard.getCell(row, column).getDOMElement().Colorz.color) {

                    this.chessboard.getCell(this.size - 1, column).setBorderColorBottom(this.chessboard.getCell(row, column).getDOMElement().Colorz.color);
                    break;
                }
            }
        }

    },
    addHandler: function () {

        // aggiungiamo handler alla scacchiera
        // cioè al click su una cella deve accadere qualcosa
        var row;

        for (var i = 0; i < this.chessboard.getSize(); i++) {

            row = this.chessboard.getRow(i);

            for (var j = 0; j < row.length; j++) {

                row[j].getDOMElement().addEventListener("click", this.showColorSelection.bind(this));
            }
        }


        // aggiungiamo handler alla scacchiera
        // cioè al click su una cella deve accadere qualcosa
        document.getElementById("ColorSelection-red").addEventListener("click", this.colorSelected.bind(this, Pawn.RED));
        document.getElementById("ColorSelection-green").addEventListener("click", this.colorSelected.bind(this, Pawn.GREEN));
        document.getElementById("ColorSelection-blue").addEventListener("click", this.colorSelected.bind(this, Pawn.BLUE));
        document.getElementById("ColorSelection-marker").addEventListener("click", this.colorSelected.bind(this, Pawn.MARKER));
    },
    showColorSelection: function (e) {

        console.log("ShowColorSelection");
        document.getElementById("ColorSelectionContainer").removeClass("is-hidden");

        this.tappedCell = this.chessboard.getCell(e.target.Colorz.row, e.target.Colorz.column);
    },
    colorSelected: function (color, e) {

        var pawn;

        if (!this.tappedCell.isEmpty()) {

            // se la cella che è stata tappata non è vuota
            // devo rimuovere la pedina già inserita

            pawn = this.tappedCell.getPawn();

            this.pawnLeft[pawn.getColor()].push(pawn);

            if (pawn.getColor() !== Pawn.MARKER) {
                document.getElementById("PawnLeft--" + pawn.getColor()).innerHTML = "x" + this.pawnLeft[pawn.getColor()].length;
            }

// la cosa qui commentata fa la stessa cosa dell'if sopra ma in modo più
// comprensibile anche se prolisso xD
//
//            switch (pawn.getColor()) {
//
//                case Pawn.MARKER:
//                    this.pawnLeft.marker.push(pawn);
//                    break;
//
//                case Pawn.RED:
//                    this.pawnLeft.red.push(pawn);
//                    document.getElementById("PawnLeft--red").innerHTML = "x" + this.pawnLeft.red.length;
//                    break;
//
//                case Pawn.GREEN:
//                    this.pawnLeft.green.push(pawn);
//                    document.getElementById("PawnLeft--green").innerHTML = "x" + this.pawnLeft.green.length;
//                    break;
//
//                case Pawn.BLUE:
//                    this.pawnLeft.blue.push(pawn);
//                    document.getElementById("PawnLeft--blue").innerHTML = "x" + this.pawnLeft.blue.length;
//                    break;
//            }

            this.tappedCell.clear();
        }

        // Ora inseriamo la pedina selezionata nella cella tappata
        switch (color) {

            case Pawn.MARKER:

                this.tappedCell.setPawn(this.pawnLeft.marker.pop());
                break;

            case Pawn.RED:

                if (this.pawnLeft.red.length === 0) {

                    // se non si possono più mettere pedine rosse
                    return;
                }

                this.tappedCell.setPawn(this.pawnLeft.red.pop());
                document.getElementById("PawnLeft--red").innerHTML = "x" + this.pawnLeft.red.length;

                if (this.pawnLeft.red.length === 0) {
                    document.getElementById("ColorSelection-red").addClass("is-disabled");
                }

                break;

            case Pawn.GREEN:

                if (this.pawnLeft.green.length === 0) {
                    return;
                }

                this.tappedCell.setPawn(this.pawnLeft.green.pop());
                document.getElementById("PawnLeft--green").innerHTML = "x" + this.pawnLeft.green.length;

                if (this.pawnLeft.green.length === 0) {
                    document.getElementById("ColorSelection-green").addClass("is-disabled");
                }

                break;

            case Pawn.BLUE:

                if (this.pawnLeft.blue.length === 0) {
                    return;
                }

                this.tappedCell.setPawn(this.pawnLeft.blue.pop());
                document.getElementById("PawnLeft--blue").innerHTML = "x" + this.pawnLeft.blue.length;

                if (this.pawnLeft.blue.length === 0) {
                    document.getElementById("ColorSelection-blue").addClass("is-disabled");
                }

                break;

            default:
                console.log("colorSelected(): default");

        }

        document.getElementById("ColorSelectionContainer").addClass("is-hidden");

        if (this.pawnLeft.red.length <= 0
                && this.pawnLeft.green.length <= 0
                && this.pawnLeft.blue.length <= 0) {

            this.checkSolution();
        }
    },
    getPawnsInTheRow: function (rowNumber) {

        var result = [];
        var row = this.chessboard.getRow(rowNumber);

        for (var i = 0; i < row.length; i++) {

            if (!row[i].isEmpty()) {
                result.push(row[i].getPawn());
            }
        }

        return result;
    },
    getPawnsInTheColumn: function (columnNumber) {

        var result = [];
        var column = this.chessboard.getColumn(columnNumber);

        for (var i = 0; i < column.length; i++) {

            if (!column[i].isEmpty()) {
                result.push(column[i].getPawn());
            }
        }

        return result;
    },
    checkSelection: function (color) {

        var columnsPawns = this.getPawnsInTheColumn();
        var rowsPawns = this.getPawnsInTheRow();

        // controlliamo che sulla riga e/o sulla colonna non ci siano già
        // 3 pedine inserite
        if (columnsPawns.length >= 3 || rowsPawns.length >= 3) {

            alert("ci sono già 3 pedine");
        }

        // controlliamo che il colore scelto non sia già presente nella colonna
        // e/o nella riga
        for (var i = 0; i < columnsPawns.length; i++) {

            if (columnsPawns[i].getColor() === color || rowsPawns[i].getColor() === color) {
                alert("c'è già una pedina con questo colore");
            }
        }
    },
    checkSolution: function () {

        var pawns;
        var red, green, blue;

        // controlliamo se ogni riga ed ogni colonna ha 3 pedine di colori diversi
        //
        // facciamo prima per ogni riga
        for (var i = 0; i < this.size; i++) {

            pawns = this.getPawnsInTheRow(i);
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
        // resettiamo i contatori
        for (var i = 0; i < this.size; i++) {

            pawns = this.getPawnsInTheColumn(i);
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


    }
};


