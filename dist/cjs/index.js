/*!
* onoffcanvas - v2.2.3
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
'use strict';

var constants = require('./constants.js');
var util = require('./util.js');
var __chunk_1 = require('./chunk-d3b966f9.js');

/**
 *
 * @export
 * @class OnoffCanvas
 */
var OnoffCanvas = /** @class */ (function () {
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {HTMLElement | string} element
     * @param {IOCDefault} [options]
     * @memberof OnoffCanvas
     */
    function OnoffCanvas(element, options) {
        var _this = this;
        this.element =
            typeof element === "string" ? document.querySelector(element) : element;
        this.config = __chunk_1.__assign({}, constants.OcDefault, options);
        this.triggerElements = document.querySelectorAll(constants.Selector.DATA_TOGGLE + "[href=\"#" + this.element.id + "\"],\n      " + constants.Selector.DATA_TOGGLE + "[data-target=\"#" + this.element.id + "\"]");
        this.addAriaExpanded(this.triggerElements);
        var triggers = [].slice.call(this.triggerElements);
        for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
            var trigger = triggers_1[_i];
            trigger.addEventListener("click", function (event) {
                if (event.currentTarget.tagName === "A") {
                    event.preventDefault();
                }
                _this.toggle();
            });
        }
        this.drawer = document.createElement("div");
        this.drawer.classList.add("onoffcanvas-drawer");
        document.documentElement.appendChild(this.drawer);
    }
    /**
     * Auto init all OnoffCanvas elements
     *
     * @static
     * @param {boolean} [escKey]
     * @memberof OnoffCanvas
     */
    OnoffCanvas.autoinit = function (options) {
        if (options === void 0) { options = constants.OcDefault; }
        var ocNodeList = document.querySelectorAll("" + constants.Selector.DATA_TOGGLE);
        var ocListArr = [].slice.call(ocNodeList);
        var selectorArr = util.selectorArray(ocListArr);
        var newOcArr = util.uniqueArr(selectorArr);
        for (var _i = 0, newOcArr_1 = newOcArr; _i < newOcArr_1.length; _i++) {
            var element = newOcArr_1[_i];
            newOnoffCanvas(element, options);
        }
    };
    OnoffCanvas.prototype.on = function (event, handle) {
        this.listen(event, handle);
        return this;
    };
    /**
     * Show/Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    OnoffCanvas.prototype.toggle = function () {
        if (this.element.classList.contains(constants.ClassName.SHOW)) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
     * Show OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    OnoffCanvas.prototype.show = function () {
        var _this = this;
        if (this.element.classList.contains(constants.ClassName.SHOW)) {
            return;
        }
        this.element.classList.add(constants.ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(constants.EventName.SHOW, this.element);
        if (this.config.createDrawer) {
            this.drawer.classList.add("is-open");
            this.drawer.addEventListener("click", this.hide.bind(this));
        }
        if (this.config.hideByEsc) {
            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 27) {
                    _this.hide();
                }
            });
        }
    };
    /**
     * Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    OnoffCanvas.prototype.hide = function () {
        if (!this.element.classList.contains(constants.ClassName.SHOW)) {
            return;
        }
        if (this.config.createDrawer) {
            this.drawer.classList.remove("is-open");
            this.drawer.removeEventListener("click", this.hide.bind(this));
        }
        this.element.classList.remove(constants.ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(constants.EventName.HIDE, this.element);
    };
    OnoffCanvas.prototype.listen = function (event, handle) {
        this.element.addEventListener(event, handle, false);
        return this;
    };
    OnoffCanvas.prototype.emit = function (evtType, target, shouldBubble) {
        if (shouldBubble === void 0) { shouldBubble = false; }
        var evt;
        if (typeof CustomEvent === "function") {
            evt = new CustomEvent(evtType, {
                bubbles: shouldBubble
            });
        }
        else {
            evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(evtType, shouldBubble, false);
        }
        this.element.dispatchEvent(evt);
        return this;
    };
    OnoffCanvas.prototype.addAriaExpanded = function (triggerElements) {
        var isOpen = this.element.classList.contains(constants.ClassName.SHOW);
        Array.prototype.forEach.call(triggerElements, function (el, i) {
            el.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    };
    return OnoffCanvas;
}());
function newOnoffCanvas(element, options) {
    var newOnoffcanvas = new OnoffCanvas(document.querySelector(element), options);
}

module.exports = OnoffCanvas;
