
function Chessboard(size, DOMElement) {

    this.size = size;
    this.DOMElement = DOMElement;
    // prima prendiamo i riferimenti alle celle nel DOM
    this.cells = MyUtils.nodeList2Matrix(this.DOMElement.querySelectorAll("td"), this.size);


    // creiamo la struttura della scacchiera
    for (var i = 0; i < this.size; i++) {

        for (var j = 0; j < this.size; j++) {
            // poi wrappiamo il riferimento al DOM con un oggetto logico
            // che rappresenta le celle
            this.cells[i][j] = new Cell(this.cells[i][j], i, j);
        }
    }

}

Chessboard.prototype = {
    getSize: function () {
        return this.size;
    },
    getDOMElement: function () {
        return this.DOMElement;
    },
    setDOMElement: function (DOMElement) {
        this.DOMElement = DOMElement;
    },
    getAllCells: function () {
        return this.cells;
    },
    getCell: function (row, column) {
        return this.cells[row][column];
    },
    insertPawn: function (row, column, color) {
        this.cells[row][column].setPawn(new Pawn(color));
    },
    removePawn: function (row, column) {
        this.cells[row][column].clear();
    },
    getRow: function (row) {

        var result = [];

        for (var i = 0; i < this.size; i++) {
            result.push(this.cells[row][i]);
        }

        return result;
    },
    getColumn: function (column) {

        var result = [];

        for (var i = 0; i < this.size; i++) {
            result.push(this.cells[i][column]);
        }

        return result;
    },
    getPawnsInTheRow: function (row) {

        var result = [];

        for (var column = 0; column < this.size; column++) {

            if (!this.cells[row][column].isEmpty()) {

                result.push(this.cells[row][column].getPawn());
            }
        }

        return result;
    },
    getPawnsInTheColumn: function (column) {

        var result = [];

        for (var row = 0; row < this.size; row++) {

            if (!this.cells[row][column].isEmpty()) {

                result.push(this.cells[row][column].getPawn());
            }
        }

        return result;
    },
    getTopBorders: function () {

        var result = [];

        for (var column = 0; column < this.getSize(); column++) {

            result.push(this.getCell(0, column).getBorderColor().top);
        }

        return result;

    },
    getRightBorders: function () {

        var result = [];

        for (var row = 0; row < this.getSize(); row++) {

            result.push(this.getCell(row, this.getSize() - 1).getBorderColor().right);
        }

        return result;

    },
    getBottomBorders: function () {

        var result = [];

        for (var column = 0; column < this.getSize(); column++) {

            result.push(this.getCell(this.getSize() - 1, column).getBorderColor().bottom);
        }

        return result;
    },
    getLeftBorders: function () {

        var result = [];

        for (var row = 0; row < this.getSize(); row++) {

            result.push(this.getCell(row, 0).getBorderColor().left);
        }

        return result;

    },
    getRowBorders: function (row) {

        var result = {};

        result.left = this.getCell(row, 0).getBorderColor().left;
        result.right = this.getCell(row, this.getSize() - 1).getBorderColor().right;

        return result;
    },
    getColumnBorders: function (column) {

        var result = {};

        result.top = this.getCell(0, column).getBorderColor().top;
        result.bottom = this.getCell(this.getSize() - 1, column).getBorderColor().bottom;

        return result;
    }
};

