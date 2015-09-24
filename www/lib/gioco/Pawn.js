
// MARKER è una pedina speciale che non viene contata come pedina del gioco
Pawn.MARKER = "marker";
Pawn.RED = "red";
Pawn.GREEN = "green";
Pawn.BLUE = "blue";

function Pawn(color) {

    this.color = color;
    this.cell = null;
    this.placed = false;
    this.inDOM = false;

    this.DOMElement = document.createElement("div");
    this.DOMElement.addClass("draggable");
    this.DOMElement.addClass("drag-drop");
    this.DOMElement.addClass("PawnLeft--" + color);

    this.DOMElement.Colorz = {
        color: color
    };
}

Pawn.prototype = {
    getColor: function () {
        return this.color;
    },
    setColor: function (color) {
        this.color = color;

        this.DOMElement.Colorz = {
            color: color
        };
    },
    isPlaced: function () {
        return this.placed;
    },
    setPlaced: function (bool) {
        this.placed = bool;
    },
    isInDOM: function () {
        return this.inDOM;
    },
    setInDOM: function (bool) {
        this.inDOM = bool;
    },
    getDOMElement: function () {
        return this.DOMElement;
    },
    setDOMElement: function (DOMElement) {
        this.DOMElement = DOMElement;
    },
    getCell: function () {
        return this.cell;
    },
    setCell: function (cell) {

        this.cell = cell;

        if (!cell) {

            delete this.DOMElement.Colorz.row;
            delete this.DOMElement.Colorz.column;

            return;
        }

        this.DOMElement.Colorz.row = cell.getRow();
        this.DOMElement.Colorz.column = cell.getColumn();
    }
};

