
function Cell(DOMElement, row, column, borderColorTop, borderColorRight, borderColorBottom, borderColorLeft) {

    this.DOMElement = DOMElement;
    this.row = row;
    this.column = column;

    // impostiamo delle proprietà all'interno dell'elemento DOM per riprenderle
    // in seguito

    this.DOMElement.Colorz = {
        row: this.row,
        column: this.column
    };

    this.borderColor = {
        top: borderColorTop,
        right: borderColorRight,
        bottom: borderColorBottom,
        left: borderColorLeft
    };
}

Cell.prototype = {
    pawn: null,
    getDOMElement: function () {
        return this.DOMElement;
    },
    getRow: function () {
        return this.row;
    },
    getColumn: function () {
        return this.column;
    },
    getBorderColor: function () {
        return this.borderColor;
    },
    setBorderColor: function (borderColor) {
        this.borderColor = borderColor;
    },
    setBorderColorTop: function (borderColorTop) {
        this.borderColor.top = borderColorTop;
        this.getDOMElement().addClass("Chessboard-border--top--" + borderColorTop);
    },
    setBorderColorRight: function (borderColorRight) {
        this.borderColor.right = borderColorRight;
        this.getDOMElement().addClass("Chessboard-border--right--" + borderColorRight);
    },
    setBorderColorBottom: function (borderColorBottom) {
        this.borderColor.bottom = borderColorBottom;
        this.getDOMElement().addClass("Chessboard-border--bottom--" + borderColorBottom);
    },
    setBorderColorLeft: function (borderColorLeft) {
        this.borderColor.left = borderColorLeft;
        this.getDOMElement().addClass("Chessboard-border--left--" + borderColorLeft);
    },
    getPawn: function () {
        return this.pawn;
    },
    setPawn: function (pawn) {

        if (!this.isEmpty()) {
            this.clear();
        }

        this.pawn = pawn;
        this.DOMElement.addClass("Chessboard-cell--" + this.pawn.getColor());
    },
    isEmpty: function () {
        return !this.pawn;
    },
    clear: function () {

        this.DOMElement.removeClass("Chessboard-cell--" + this.pawn.getColor());
        this.pawn = undefined;
    }
};

