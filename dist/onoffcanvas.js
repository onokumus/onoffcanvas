(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.OnoffCanvas = factory());
}(this, (function () { 'use strict';

  /*!
  * onoffcanvas - v2.2.1
  * An offcanvas plugin
  * https://github.com/onokumus/onoffcanvas#readme
  *
  * Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
  * Under MIT License
  */

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
    } catch (error) {
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

    for (var _iterator = arrs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var element = _ref;
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


  var OnoffCanvas =
  /*#__PURE__*/
  function () {
    /**
     * Auto init all OnoffCanvas elements
     *
     * @static
     * @param {boolean} [escKey]
     * @memberof OnoffCanvas
     */
    OnoffCanvas.autoinit = function autoinit(options) {
      if (options === void 0) {
        options = OcDefault;
      }

      var ocNodeList = document.querySelectorAll("" + Selector.DATA_TOGGLE);
      var ocListArr = [].slice.call(ocNodeList);
      var selectorArr = selectorArray(ocListArr);
      var newOcArr = uniqueArr(selectorArr);

      for (var _iterator = newOcArr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var element = _ref;
        newOnoffCanvas(element, options);
      }
    };
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {HTMLElement} _element
     * @param {IOCDefault} [options]
     * @memberof OnoffCanvas
     */


    function OnoffCanvas(element, options) {
      var _this = this;

      this.element = typeof element === "string" ? document.querySelector(element) : element;
      this.config = Object.assign({}, OcDefault, options);
      this.triggerElements = document.querySelectorAll(Selector.DATA_TOGGLE + "[href=\"#" + this.element.id + "\"],\n      " + Selector.DATA_TOGGLE + "[data-target=\"#" + this.element.id + "\"]");
      this.addAriaExpanded(this.triggerElements);
      var triggers = [].slice.call(this.triggerElements);

      for (var _iterator2 = triggers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var trigger = _ref2;
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

    var _proto = OnoffCanvas.prototype;

    _proto.listen = function listen(event, handle) {
      this.element.addEventListener(event, handle, false);
      return this;
    };

    _proto.emit = function emit(evtType, target, shouldBubble) {
      if (shouldBubble === void 0) {
        shouldBubble = false;
      }

      var evt;

      if (typeof CustomEvent === "function") {
        evt = new CustomEvent(evtType, {
          bubbles: shouldBubble
        });
      } else {
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(evtType, shouldBubble, false);
      }

      this.element.dispatchEvent(evt);
      return this;
    };

    _proto.on = function on(event, handle) {
      this.listen(event, handle);
      return this;
    };
    /**
     * Show/Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */


    _proto.toggle = function toggle() {
      if (this.element.classList.contains(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };
    /**
     * Show OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */


    _proto.show = function show() {
      var _this2 = this;

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
            _this2.hide();
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


    _proto.hide = function hide() {
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

    _proto.addAriaExpanded = function addAriaExpanded(triggerElements) {
      var isOpen = this.element.classList.contains(ClassName.SHOW);
      Array.prototype.forEach.call(triggerElements, function (el, i) {
        el.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    };

    return OnoffCanvas;
  }();

  function newOnoffCanvas(element, options) {
    var newOnoffcanvas = new OnoffCanvas(document.querySelector(element), options);
  }

  var cjs = OnoffCanvas;

  return cjs;

})));
//# sourceMappingURL=onoffcanvas.js.map
