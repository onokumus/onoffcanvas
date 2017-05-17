/**
 * onoffcanvas - An offcanvas plugin
 * @version v2.0.0
 * @link https://github.com/onokumus/onoffcanvas#readme
 * @license MIT
 */
var OnoffCanvas = (function () {
    function OnoffCanvas(element) {
        this.element = element;
        this.triggerElements = document.querySelectorAll("[data-toggle=\"onoffcanvas\"][href=\"#" + element.id + "\"],[data-toggle=\"onoffcanvas\"][data-target=\"#" + element.id + "\"]");
        this.addAriaExpanded(this.triggerElements);
        this.toggle();
    }
    OnoffCanvas.prototype.toggle = function () {
        if (this.element.classList.contains('is-open')) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    OnoffCanvas.prototype.show = function () {
        if (this.element.classList.contains('is-open')) {
            return;
        }
        this.element.classList.add('is-open');
        this.addAriaExpanded(this.triggerElements);
    };
    OnoffCanvas.prototype.hide = function () {
        if (!this.element.classList.contains('is-open')) {
            return;
        }
        this.element.classList.remove('is-open');
        this.addAriaExpanded(this.triggerElements);
    };
    OnoffCanvas.prototype.addAriaExpanded = function (triggerElements) {
        var isOpen = this.element.classList.contains('is-open');
        Array.prototype.forEach.call(triggerElements, function (el, i) {
            el.setAttribute('aria-expanded', isOpen);
        });
    };
    return OnoffCanvas;
}());
function getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target');
    if (!selector || !(/^#/g.test(selector))) {
        selector = element.getAttribute('href') || '';
    }
    try {
        var $selector = document.querySelectorAll(selector);
        return $selector.length > 0 ? selector : null;
    }
    catch (error) {
        throw new Error('Target Not Found!');
    }
}
function getTargetFromTrigger(element) {
    var selector = getSelectorFromElement(element);
    return selector ? document.querySelector(selector) : null;
}
var onoffcanvas = document.querySelectorAll('[data-toggle="onoffcanvas"]');
Array.prototype.forEach.call(onoffcanvas, function (oc) {
    oc.addEventListener('click', function (event) {
        event.preventDefault();
        var href = getTargetFromTrigger(oc);
        new OnoffCanvas(href);
    });
});
