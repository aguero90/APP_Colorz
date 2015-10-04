
define(function (require) {

    // questo modulo non ha dipendenze

    var Cell = function (DOMElement, row, column, borderColorTop,
            borderColorRight, borderColorBottom, borderColorLeft) {

        this.DOMElement = DOMElement;
        this.row = row;
        this.column = column;

        // impostiamo delle proprietà all'interno dell'elemento DOM per riprenderle
        // in seguito
        DOMElement.Colorz = {
            row: row,
            column: column
        };

        this.borderColor = {
            top: borderColorTop,
            right: borderColorRight,
            bottom: borderColorBottom,
            left: borderColorLeft
        };

        this.pawn = null;
    };

    Cell.prototype.getDOMElement = function () {
        return this.DOMElement;
    };

    Cell.prototype.getRow = function () {
        return this.row;
    };

    Cell.prototype.getColumn = function () {
        return this.column;
    };

    Cell.prototype.getBorderColor = function () {
        return this.borderColor;
    };

    Cell.prototype.setBorderColor = function (borderColor) {
        this.borderColor = borderColor;
    };

    Cell.prototype.setBorderColorTop = function (borderColorTop) {
        this.borderColor.top = borderColorTop;
    };

    Cell.prototype.setBorderColorRight = function (borderColorRight) {
        this.borderColor.right = borderColorRight;
    };

    Cell.prototype.setBorderColorBottom = function (borderColorBottom) {
        this.borderColor.bottom = borderColorBottom;
    };

    Cell.prototype.setBorderColorLeft = function (borderColorLeft) {
        this.borderColor.left = borderColorLeft;
    };

    Cell.prototype.getPawn = function () {
        return this.pawn;
    };

    Cell.prototype.setPawn = function (pawn) {

//        if (!this.isEmpty()) {
//            this.clear();
//        }

        this.pawn = pawn;
    };

    Cell.prototype.isEmpty = function () {
        return !this.pawn;
    };

    Cell.prototype.clear = function () {
        this.pawn = null;
    };

    Cell.prototype.clearBorder = function () {

        this.borderColor.top = null;
        this.borderColor.right = null;
        this.borderColor.bottom = null;
        this.borderColor.left = null;
    };


    // esponiamo pubblicamente il modulo
    return Cell;

});
