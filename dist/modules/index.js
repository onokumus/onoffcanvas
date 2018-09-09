/*!
* onoffcanvas - v2.2.3
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
import { ClassName, EventName, OcDefault, Selector } from './constants.js';
import { selectorArray, uniqueArr } from './util.js';
import { a as __assign } from './chunk-6fed8d7d.js';

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
        this.config = __assign({}, OcDefault, options);
        this.triggerElements = document.querySelectorAll(Selector.DATA_TOGGLE + "[href=\"#" + this.element.id + "\"],\n      " + Selector.DATA_TOGGLE + "[data-target=\"#" + this.element.id + "\"]");
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
        if (options === void 0) { options = OcDefault; }
        var ocNodeList = document.querySelectorAll("" + Selector.DATA_TOGGLE);
        var ocListArr = [].slice.call(ocNodeList);
        var selectorArr = selectorArray(ocListArr);
        var newOcArr = uniqueArr(selectorArr);
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
        if (this.element.classList.contains(ClassName.SHOW)) {
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
        if (this.element.classList.contains(ClassName.SHOW)) {
            return;
        }
        this.element.classList.add(ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(EventName.SHOW, this.element);
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
        if (!this.element.classList.contains(ClassName.SHOW)) {
            return;
        }
        if (this.config.createDrawer) {
            this.drawer.classList.remove("is-open");
            this.drawer.removeEventListener("click", this.hide.bind(this));
        }
        this.element.classList.remove(ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(EventName.HIDE, this.element);
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
        var isOpen = this.element.classList.contains(ClassName.SHOW);
        Array.prototype.forEach.call(triggerElements, function (el, i) {
            el.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    };
    return OnoffCanvas;
}());
function newOnoffCanvas(element, options) {
    var newOnoffcanvas = new OnoffCanvas(document.querySelector(element), options);
}

export default OnoffCanvas;
