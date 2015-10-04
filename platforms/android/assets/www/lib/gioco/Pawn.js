
define(function (require) {

    // questo modulo non ha dipendenze

    var Pawn = function (color) {

        this.color = color;
        this.cell = null;
        this.placed = false;
        this.inDOM = false;

        this.DOMElement = document.createElement("div");
        this.DOMElement.addClass("draggable");
        this.DOMElement.addClass("drag-drop");
        this.DOMElement.addClass("PawnLeft--" + color);

        this.DOMElement.Colorz = {color: color};
    };


    // definiamo le variabili statiche
    Pawn.RED = "red";
    Pawn.GREEN = "green";
    Pawn.BLUE = "blue";
    // MARKER è una pedina speciale che non viene contata come pedina del gioco
    Pawn.MARKER = "marker";


    Pawn.prototype.getColor = function () {
        return this.color;
    };

    Pawn.prototype.setColor = function (color) {
        this.color = color;

        this.DOMElement.Colorz = {
            color: color
        };
    };

    Pawn.prototype.isPlaced = function () {
        return this.placed;
    };

    Pawn.prototype.setPlaced = function (bool) {
        this.placed = bool;
    };

    Pawn.prototype.isInDOM = function () {
        return this.inDOM;
    };

    Pawn.prototype.setInDOM = function (bool) {
        this.inDOM = bool;
    };

    Pawn.prototype.getDOMElement = function () {
        return this.DOMElement;
    },
            Pawn.prototype.setDOMElement = function (DOMElement) {
                this.DOMElement = DOMElement;
            };

    Pawn.prototype.getCell = function () {
        return this.cell;
    };

    Pawn.prototype.setCell = function (cell) {

        this.cell = cell;

        if (!cell) {

            delete this.DOMElement.Colorz.row;
            delete this.DOMElement.Colorz.column;

            return;
        }

        this.DOMElement.Colorz.row = cell.getRow();
        this.DOMElement.Colorz.column = cell.getColumn();
    };



    // esponiamo il modulo pubblicamente
    return Pawn;

});

