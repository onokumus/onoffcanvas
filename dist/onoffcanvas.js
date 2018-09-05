/*!
* onoffcanvas - v2.2.2
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.OnoffCanvas = factory());
}(this, (function () { 'use strict';

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

    var NAME = "onoffcanvas";
    var EVENT_KEY = "." + NAME;
    var EventName = {
        HIDE: "hide" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY
    };
    var ClassName = {
        SHOW: "is-open"
    };
    var Selector = {
        DATA_TOGGLE: '[data-toggle="onoffcanvas"]'
    };
    var OcDefault = {
        createDrawer: true,
        hideByEsc: true
    };

    function getSelectorFromElement(element) {
        var selector = element.getAttribute("data-target");
        if (!selector || selector === "#") {
            selector = element.getAttribute("href") || "";
        }
        try {
            var $selector = document.querySelectorAll(selector);
            return $selector.length > 0 ? selector : null;
        }
        catch (error) {
            throw new Error("Target Not Found!");
        }
    }
    function uniqueArr(arr) {
        var uniqueArray = arr.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        return uniqueArray;
    }
    function selectorArray(arrs) {
        var divArr = [];
        for (var _i = 0, arrs_1 = arrs; _i < arrs_1.length; _i++) {
            var element = arrs_1[_i];
            var selector = getSelectorFromElement(element);
            divArr.push(selector);
        }
        return divArr;
    }

    /**
     *
     * @export
     * @class OnoffCanvas
     * @extends {EventEmitter}
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

    return OnoffCanvas;

})));
//# sourceMappingURL=onoffcanvas.js.map
