
function Chessboard(size, DOMElement) {

    this.size = size;
    this.DOMElement = DOMElement;
    // prima prendiamo i riferimenti alle celle nel DOM
    this.cells = MyUtils.nodeList2Matrix(this.DOMElement.querySelectorAll("td"), this.size);
    this.border = {
        top: [],
        right: [],
        bottom: [],
        left: []
    };


    // creiamo la struttura della scacchiera
    for (var i = 0; i < this.size; i++) {

        for (var j = 0; j < this.size; j++) {
            // poi wrappiamo il riferimento al DOM con un oggetto logico
            // che rappresenta le celle
            this.cells[i][j] = new Cell(this.cells[i][j], i, j);
        }

        this.border.top[i] = new BorderCell();
        this.border.right[i] = new BorderCell();
        this.border.bottom[i] = new BorderCell();
        this.border.left[i] = new BorderCell();
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
    getBordersOfTheRow: function (row) {

        return {
            left: this.border.left[row],
            right: this.border.right[row]
        };
    },
    getBordersOfTheColumn: function (column) {

        return {
            top: this.border.top[column],
            bottom: this.border.bottom[column]
        };
    },
    setLeftBorderOfTheRow: function (row, color) {

        this.border.left[row].setColor(color);
    },
    setRightBorderOfTheRow: function (row, color) {

        this.border.right[row].setColor(color);
    },
    setTopBorderdOfTheColumn: function (column, color) {

        this.border.top[column].setColor(color);
    },
    setBottomBorderdOfTheColumn: function (column, color) {

        this.border.bottom[column].setColor(color);
    }
};

