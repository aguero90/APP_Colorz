//     Utils.js 0.0.1

//     (c) 2013-2014 Ivano Malavolta
//     Utils may be freely distributed under the MIT license.
//     http://www.ivanomalavolta.com
define(function (require) {

    // Initial Setup
    // -------------

    // get references to Backbone and Handlebars libraries
    var Backbone = require("backbone");
    var Handlebars = require("handlebars");

    // the object representing the framework
    var Utils = {
        templates: {}
    };

    // This method substitutes Backbone's extend in order to allow developers to
    // identify Backbone objects in the Chrome profiler
    var extend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        // BEGIN customized section
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else if (_.has(protoProps, 'constructorName')) {
            eval("child = function " + protoProps.constructorName + "() { return parent.apply(this, arguments); };");
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        // END customized section

        _.extend(child, parent, staticProps);
        var Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        if (protoProps)
            _.extend(child.prototype, protoProps);
        child.__super__ = parent.prototype;
        return child;
    };

    Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = Backbone.History.extend = extend;

    // Templates
    // -------------

    // We expect the templates module as a Require object module with the following structure:
    //  - key: the name of the template as it must be referenced by the Backbone view
    //  - value: the path of the html file containing the HTML fragment of the template
    var Templates = require("../js/templates");

    // here we have to put the "text!" prefix to the path of each template
    for (var t in Templates) {
        Templates[t] = "text!" + Templates[t];
    }

    // here we say that Utils is a Backbone object so that it is able to send and receive events
    _.extend(Utils, Backbone.Events);

    // this method is called to load the templates and precompile them
    Utils.loadTemplates = function () {
        require(_.values(Templates), function () {
            var fragments = _.object(_.keys(Templates), arguments);
            // precompile all the fragments
            for (var t in fragments) {
                Utils.templates[t] = Handlebars.compile(fragments[t]);
            }
            // we notify the caller that all the templates have been loaded
            Utils.trigger("templatesLoaded");
        });
        // we return this so that the caller can simply call the once method in chain with the call to the loadTemplates method
        return this;
    };

    // Backbone's View enhancementes
    // -------------

    // function that will be called by the router every time a view must be removed from the DOM
    Backbone.View.prototype.close = function () {
        // notify the new view that it is being removed
        this.trigger("removing");
        // close also all its subviews
        if (this.subViews) {
            for (var i = 0; i < this.subViews.length; i++) {
                this.subViews[i].close();
            }
        }
        // delete all references to subViews
        this.subViews = null;
        // remove the view from the DOM
        this.remove();
        // remove references to the DOM element of the view (both jQuery and JS objects)
        this.$el = null;
        this.el = null;
    };

    // function that will be called by the router every time a view must be removed from the DOM
    Backbone.Router.prototype.changePage = function (page) {
        // close the current view
        if (this.currentView) {
            this.currentView.close();
        }
        // cache the new view
        this.currentView = page;
        // render the new view
        page.render();
        // put the new view into the DOM
        this.structureView.contentElement.appendChild(page.el);
        // notify the new view that it is now in the DOM
        this.currentView.trigger("inTheDOM");
    };

    // Pages
    // -------------

    // Pages are special kinds of Backbone's views that take the whole screen of the mobile application
    // the router is in charge of dynamically navigating among pages by means of the changePage method
    Utils.Page = Backbone.View.extend({
        // here we will put all Page-specific code
    });

    // Utility methods
    // -------------

    // shows an arbitrary website in the inner browser
    Utils.showWebsite = function (url) {
        if (navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('It looks like you have no Internet connection, please can you check it?', function () {
            }, "No Internet");
            return;
        }
        window.open(url, '_blank', 'location=yes,closebuttoncaption=close,EnableViewPortScale=yes');
    };

    // if we have a 404 error when loading an image, we put a transparent pixel in place of the ?? icon
    Utils.imgError = function (source) {
        empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
        source.src = "data:image/png;base64," + empty1x1png;
        source.onerror = "";
        return true;
    };

    // checks if the objects has no properties
    Utils.isObjectEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };


    // BUILT-IN OBJECT UPGRADE
    // =========================================================================

    // equivalent to Java's String.startsWith
    String.prototype.startsWith = function (prefix) {
        return this.indexOf(prefix) === 0;
    };

    // equivalent to Java's String.endsWith
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    // removes all XML (so also HTML) tags from the string
    String.prototype.strip = function () {
        return this.replace(/(<([^>]+)>)/ig, "").replace(/(&lt;([^&gt;]+)&gt;)/ig, "");
    };

    // per rendere disponibile la funzione contains anche su chrome
    if (!String.prototype.contains) {

        String.prototype.contains = function (subString) {

            return this.indexOf(subString) !== -1;
        };
    }

    // per rendere disponibile la funzione remove
    if (!Array.prototype.remove) {

        Array.prototype.remove = function (el) {

            if (this.indexOf(el) !== -1) {
                this.splice(this.indexOf(el), 1);
            }
        };
    }

    // per rendere disponibile la funzione hasClass
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

    // per rendere disponibile la funzione addClass
    if (!Element.prototype.addClass) {

        Element.prototype.addClass = function (className) {

            this.classList ? this.classList.add(className) : this.className += ' ' + className;

        };
    }

    // per rendere disponibile la funzione removeClass
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


    // HANDLEBARS HELPER
    // =========================================================================

    Handlebars.registerHelper('for', function (from, to, incr, block) {

        var accum = '';

        for (var i = from; i < to; i += incr) {

            accum += block.fn(i);
        }

        return accum;
    });

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });


    // APP DEPENDANT FUNCTION
    // =========================================================================

    Utils.nodeList2Matrix = function (listaDiNodi, size) {

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


    // POLYFILL
    // =========================================================================

    if (typeof Object.create !== 'function') {

        Object.create = (function () {

            var Object = function () {
            };


            return function (prototype) {

                if (arguments.length > 1) {
                    throw Error('Second argument not supported');
                }

                if (typeof prototype !== 'object') {
                    throw TypeError('Argument must be an object');
                }

                Object.prototype = prototype;
                var result = new Object();
                Object.prototype = null;
                return result;
            };
        })();
    }


    // questa funzione è un polyfill preso su https://gist.github.com/paulirish/1579671
    // della requestAnimationFrame() poiche non è supportata da tutti i browser
    // http://caniuse.com/#search=requestAnimationFrame
    // ( nel nostro caso è necessaria la compatibilità con android <= 4.3 )
    //
    // Questa funzione la implementa attraverso setTimeout
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {

        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {


            window.requestAnimationFrame = function (callback, element) {

                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));

                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);

                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {

            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }




    // the Utils object is public
    return Utils;
});