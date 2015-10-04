
define(function (require) {

    var GraphicsLayer = require("graphicsLayer");

    var LevelGraphicsLayer = function (game) {

        GraphicsLayer.call(this, game);
    };

    LevelGraphicsLayer.prototype = Object.create(GraphicsLayer.prototype);
    LevelGraphicsLayer.prototype.constructor = LevelGraphicsLayer;

    LevelGraphicsLayer.prototype.init = function (dt) {

        GraphicsLayer.prototype.init.call(this);

        this.timer = document.getElementById("Timer");
        this.isTimerRunning = null;
    };

    LevelGraphicsLayer.prototype.updateTimer = function (dt) {

        var now = new Date().getTime();

        if (now - this.game.startTime >= this.game.level.timeLimit) {

            this.timer.addClass('timeExceeded');
        }

        // aggiorniamo il timer
        this.timer.innerHTML = this.formatTime(now - this.game.startTime);

        return this.isTimerRunning;
    };

    LevelGraphicsLayer.prototype.animLoop = function (render, element) {

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

    LevelGraphicsLayer.prototype.startTimer = function () {

        this.isTimerRunning = true;
        this.animLoop(this.updateTimer.bind(this));
    };

    LevelGraphicsLayer.prototype.stopTimer = function () {

        this.isTimerRunning = false;
    };

    LevelGraphicsLayer.prototype.formatTime = function (time) {

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


    LevelGraphicsLayer.prototype.onTapNewGameWin = function (e) {

        GraphicsLayer.prototype.onTapNewGameWin.call(this);

        this.game.exit();
    };

    LevelGraphicsLayer.prototype.showWinDialog = function (starsInfo) {

        var star1 = document.getElementById('obtainedStars-first');
        var star2 = document.getElementById('obtainedStars-second');
        var star3 = document.getElementById('obtainedStars-third');

        var starInfoTimeIcon = document.getElementById('infoStars-second-icon');
        var starInfoRemovedIcon = document.getElementById('infoStars-third-icon');

        var starInfoTimeText = document.getElementById('infoStars-second-text');
        var starInfoRemovedText = document.getElementById('infoStars-third-text');

        if (starsInfo.number === 1) {

            star1.addClass('icon_star');
            star2.addClass('icon_star_alt');
            star3.addClass('icon_star_alt');

        } else if (starsInfo.number === 2) {

            star1.addClass('icon_star');
            star2.addClass('icon_star');
            star3.addClass('icon_star_alt');

        } else {

            star1.addClass('icon_star');
            star2.addClass('icon_star');
            star3.addClass('icon_star');
        }


        starsInfo.time ? starInfoTimeIcon.addClass('icon_check_alt') : starInfoTimeIcon.addClass('icon_close_alt');
        starsInfo.removed ? starInfoRemovedIcon.addClass('icon_check_alt') : starInfoRemovedIcon.addClass('icon_close_alt');

        starInfoTimeText.innerHTML = "<b>Tempo:</b> " + this.formatTime(this.game.elapsedTime) + " / " + this.formatTime(this.game.level.timeLimit);
        starInfoRemovedText.innerHTML = "<b>Errori:</b> " + this.game.removedCount + " / " + this.game.level.removedLimit;

        this.winDialog.removeClass("is-hidden");
    };




    // esponiamo pubblicamente il modulo
    return LevelGraphicsLayer;
});

