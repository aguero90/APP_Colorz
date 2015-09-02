
// MARKER è una pedina speciale che non viene contata come pedina del gioco
Pawn.MARKER = "marker";
Pawn.RED = "red";
Pawn.GREEN = "green";
Pawn.BLUE = "blue";

function Pawn(color) {

    this.color = color;
}

Pawn.prototype = {
    getColor: function () {
        return this.color;
    },
    setColor: function (color) {
        this.color = color;
    }
};

