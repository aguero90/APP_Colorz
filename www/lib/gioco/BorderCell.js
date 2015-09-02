
/**
 *
 * Ha le stesse proprietà di Pawn ma concettualmente è molto diverso!
 *
 */

function BorderCell(color) {

    this.color = color;
}

BorderCell.prototype = {
    getColor: function () {
        return this.color;
    },
    setColor: function (color) {
        this.color = color;
    }
};


