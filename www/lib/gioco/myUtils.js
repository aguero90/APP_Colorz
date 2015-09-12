
function MyUtils() {

}
;

MyUtils.enhanceDOMElements = function () {


    /* per rendere disponibile la funzione contains anche su chrome */
    if (!String.prototype.contains) {

        String.prototype.contains = function (subString) {

            return this.indexOf(subString) !== -1;
        };
    }

    /* per rendere disponibile la funzione remove */
    if (!Array.prototype.remove) {

        Array.prototype.remove = function (el) {

            if (this.indexOf(el) !== -1) {
                this.splice(this.indexOf(el), 1);
            }
        };
    }

    /* per rendere disponibile la funzione hasClass */
    if (!Element.prototype.hasClass) {

        Element.prototype.hasClass = function (className) {

            if (this.classList) {
                return this.classList.contains(className);
            }
            else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
            }
        };
    }

    /* per rendere disponibile la funzione addClass */
    if (!Element.prototype.addClass) {

        Element.prototype.addClass = function (className) {

            this.classList ? this.classList.add(className) : this.className += ' ' + className;

        };
    }


    /* per rendere disponibile la funzione removeClass */
    if (!Element.prototype.removeClass) {

        Element.prototype.removeClass = function (className) {

            if (this.classList) {
                this.classList.remove(className);
            }
            else {
                this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        };
    }


    /* per rendere disponibile la funzione toggleClass */
    if (!Element.prototype.toggleClass) {

        Element.prototype.toggleClass = function (className) {

            this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
        };
    }

};

MyUtils.nodeList2Matrix = function (listaDiNodi, size) {
    var result = new Array(size);
    var cont = 0;
    for (var riga = 0; riga < size; riga++) {
        result[riga] = new Array(size);
        for (var colonna = 0; colonna < size; colonna++) {
            result[riga][colonna] = listaDiNodi[cont];
            cont++;
        }
    }
    return result;
};




