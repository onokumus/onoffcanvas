/*!
* onoffcanvas - v2.2.4
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
import { ClassName, EventName, OcDefault, Selector } from './constants.js';
import { isElement, selectorArray, uniqueArr } from './util.js';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
     * @param {Element | string} element
     * @param {IOCDefault} [options]
     * @memberof OnoffCanvas
     */
    function OnoffCanvas(element, options) {
        var _this = this;
        this.element = isElement(element)
            ? element
            : document.querySelector(element);
        this.config = __assign(__assign({}, OcDefault), options);
        this.triggerElements = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE + "[href=\"#" + this.element.id + "\"],\n      " + Selector.DATA_TOGGLE + "[data-target=\"#" + this.element.id + "\"]"));
        this.addAriaExpanded(this.triggerElements);
        this.triggerElements.forEach(function (el) {
            el.addEventListener("click", function (event) {
                var eventTarget = event.target;
                if (eventTarget && eventTarget.tagName === "A") {
                    event.preventDefault();
                }
                _this.toggle();
            });
        });
        this.drawer = document.createElement("div");
        this.drawer.classList.add("onoffcanvas-drawer");
        document.documentElement.appendChild(this.drawer);
    }
    OnoffCanvas.attachTo = function (element, options) {
        return new OnoffCanvas(element, options);
    };
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
            OnoffCanvas.attachTo(element, options);
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
                bubbles: shouldBubble,
            });
        }
        else {
            evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(evtType, shouldBubble, false, target);
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

export default OnoffCanvas;
