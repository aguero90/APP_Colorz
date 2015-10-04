
define(function (require) {

    // impostiamo le dipendenze
    var Interact = require("interact");
    var GraphicsLayer = require("graphicsLayer");

    var TimeGraphicsLayer = function (game) {

        GraphicsLayer.call(this, game);
    };

    TimeGraphicsLayer.prototype = Object.create(GraphicsLayer.prototype);
    TimeGraphicsLayer.prototype.constructor = TimeGraphicsLayer;

    TimeGraphicsLayer.prototype.init = function () {

        GraphicsLayer.prototype.init.call(this);

        this.timer = document.getElementById("Timer");
        this.isTimerRunning = null;
        this.timeLeft = this.game.timeLeft;

        this.TimeUpDialog = document.getElementById("TimeUp");
        this.TimeUpDialogNewGameButton = document.getElementById("NewGameTimeUp");

        Interact(this.TimeUpDialogNewGameButton).on('tap', this.onTapNewGameTimeUp);
    };

    TimeGraphicsLayer.prototype.updateTimer = function (dt) {

        var now = new Date().getTime();

        if (now >= this.game.endTime) {

            // diciamo al gioco che il tempo è scaduto
            this.game.timeUp();
            // ritorniamo false per bloccare il loop
            return false;
        }

        // aggiorniamo il timer
        this.timer.innerHTML = this.formatTime(this.game.endTime - now);

        return this.isTimerRunning;
    };

    TimeGraphicsLayer.prototype.animLoop = function (render, element) {

        var running, lastFrame = new Date().getTime();

        function loop(now) {

            // stop the loop if render returned false
            if (running !== false) {

                requestAnimationFrame(loop, element);
                var dt = now - lastFrame;
                // do not render frame when dt is too high
                if (dt < 160) {

                    running = render(dt);
                }

                lastFrame = now;
            }
        }

        loop(lastFrame);
    };

    TimeGraphicsLayer.prototype.startTimer = function () {

        this.isTimerRunning = true;

        // NOTA: il bind è necessario
        this.animLoop(this.updateTimer.bind(this));
    };

    TimeGraphicsLayer.prototype.stopTimer = function () {

        this.isTimerRunning = false;
    };

    TimeGraphicsLayer.prototype.formatTime = function (time) {

        // time è un intero che indica i millisecondi
        var seconds = Math.floor(time / 1000);
        var minutes = Math.floor(seconds / 60);

        seconds = seconds % 60;

        if (minutes < 10) {

            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    };

    TimeGraphicsLayer.prototype.onTapNewGameTimeUp = function (e) {

        this.TimeUpDialog.addClass("is-hidden");
        this.game.restart();
    };

    TimeGraphicsLayer.prototype.onTapNewGameWin = function (e) {

        GraphicsLayer.prototype.onTapNewGameWin.call(this);

        this.game.restart();
    };

    TimeGraphicsLayer.prototype.destroy = function (e) {

        GraphicsLayer.prototype.destroy.call(this);

        Interact(this.TimeUpDialogNewGameButton).unset();

//        this.timer = null;
//        this.isTimerRunning = null;
//        this.timeLeft = null;
//        this.TimeUpDialog = null;
//        this.TimeUpDialogNewGameButton = null;
    };


    // esponiamo pubblicamente il modulo
    return TimeGraphicsLayer;

});

