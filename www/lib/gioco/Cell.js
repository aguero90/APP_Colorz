
function Cell(DOMElement, row, column, borderColorTop, borderColorRight, borderColorBottom, borderColorLeft) {

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
    },
    setBorderColorRight: function (borderColorRight) {
        this.borderColor.right = borderColorRight;
    },
    setBorderColorBottom: function (borderColorBottom) {
        this.borderColor.bottom = borderColorBottom;
    },
    setBorderColorLeft: function (borderColorLeft) {
        this.borderColor.left = borderColorLeft;
    },
    getPawn: function () {
        return this.pawn;
    },
    setPawn: function (pawn) {

//        if (!this.isEmpty()) {
//            this.clear();
//        }

        this.pawn = pawn;
    },
    isEmpty: function () {
        return !this.pawn;
    },
    clear: function () {

        this.pawn = undefined;
    },
    clearBorder: function () {

        this.borderColor.top = null;
        this.borderColor.right = null;
        this.borderColor.bottom = null;
        this.borderColor.left = null;
    }
};

