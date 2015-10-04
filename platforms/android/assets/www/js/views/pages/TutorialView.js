define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Interact = require("interact");

    var TutorialView = Utils.Page.extend({
        constructorName: "TutorialView",
        id: "TutorialContainer",
        // qui inseriamo eventuali classi che vogliamo aggiungere
        // al wrapper del template
        className: "",
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.tutorial;

            // here we can register to inTheDOM or removing events
            this.listenTo(this, "inTheDOM", this.onTheDOM);
            this.listenTo(this, "removing", this.onRemove);

            // by convention, all the inner views of a view must be stored in this.subViews
        },
        render: function () {

            this.el.innerHTML = this.template();
            return this;
        },
        onTheDOM: function () {

            this.nextButton = document.getElementById('next');
            setTimeout(this.animation1.bind(this), 300);

            this.onBackButton = this.onBackButton.bind(this);
            document.addEventListener('backbutton', this.onBackButton);
        },
        onRemove: function () {

            document.removeEventListener('backbutton', this.onBackButton);
        },
        onBackButton: function () {

            // no-op
        },
        animation1: function () {

            var a = document.getElementById('animation1');

            a.addClass('show');

            setTimeout(this.animation2.bind(this), 1000 + 300);
        },
        // mostra la scacchiera per la prima volta
        animation2: function () {

            document.getElementById('GameLayerContainer').addClass('show');
            setTimeout(this.animation3.bind(this), 1500 + 300);

        },
        // prima regola
        animation3: function () {

            document.getElementById('animation2').addClass('show');
            setTimeout(this.animation4.bind(this), 3000 + 300);

        },
        animation4: function () {

            this.movePawn('red', 3, 'cell_1-1');
            setTimeout(this.wait1.bind(this), 300);
        },
        wait1: function () {

            this.nextButton.addClass('show');
            Interact(this.nextButton).on('tap', this.restart1.bind(this));
        },
        restart1: function () {

            this.nextButton.removeClass('show');
            Interact(this.nextButton).unset();

            setTimeout(this.animation5.bind(this), 300);
        },
        // seconda regola
        animation5: function () {

            document.getElementById('animation3').addClass('show');
            setTimeout(this.animation6.bind(this), 3000 + 300);
        },
        animation6: function () {

            this.movePawn('blue', 3, 'cell_1-3');
            setTimeout(this.animation7.bind(this), 1500 + 300);
        },
        animation7: function () {

            this.movePawn('green', 3, 'cell_1-2');
            setTimeout(this.wait2.bind(this), 300);
        },
        wait2: function () {

            this.nextButton.addClass('show');
            Interact(this.nextButton).on('tap', this.restart2.bind(this));
        },
        restart2: function () {

            this.nextButton.removeClass('show');
            Interact(this.nextButton).unset();

            setTimeout(this.animation8.bind(this), 300);
        },
        // terza ed ultima regola
        animation8: function () {

            document.getElementById('animation4').addClass('show');
            setTimeout(this.animation9.bind(this), 3000 + 300);
        },
        animation9: function () {

            this.movePawn('green', 2, 'cell_3-1');
            setTimeout(this.animation10.bind(this), 1000 + 300);
        },
        animation10: function () {

            this.movePawn('red', 2, 'cell_3-3');
            setTimeout(this.animation11.bind(this), 1000 + 300);
        },
        animation11: function () {

            this.movePawn('blue', 2, 'cell_3-2');
            setTimeout(this.animation12.bind(this), 1000 + 300);
        },
        animation12: function () {

            this.movePawn('blue', 1, 'cell_2-1');
            setTimeout(this.animation13.bind(this), 1000 + 300);
        },
        animation13: function () {

            this.movePawn('green', 1, 'cell_2-3');
            setTimeout(this.animation14.bind(this), 1000 + 300);
        },
        animation14: function () {

            this.movePawn('red', 1, 'cell_2-2');
            setTimeout(this.wait3.bind(this), 300);
        },
        wait3: function () {

            this.nextButton.addClass('show');
            Interact(this.nextButton).on('tap', this.exit.bind(this));
        },
        exit: function () {

            Backbone.history.history.back();
        },
        movePawn: function (color, number, cellID) {

            var pawn = document.getElementById('PawnLeft-dummyContainer--' + color).children[number];
            var cell = document.getElementById(cellID);

            var pawnRect = pawn.getBoundingClientRect();
            var cellRect = cell.getBoundingClientRect();

            var x = (cellRect.left + cellRect.width / 2) - (pawnRect.left + pawnRect.width / 2);
            var y = (cellRect.top + cellRect.height / 2) - (pawnRect.top + pawnRect.height / 2);

            pawn.style.webkitTransform = pawn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            document.getElementById("PawnLeft--" + color + "-text").innerHTML = 'x' + (number - 1);
            document.getElementById('PawnLeft-dummyContainer--' + color).children[number - 1].addClass('visible');
        }

    });

    return TutorialView;

});