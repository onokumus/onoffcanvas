/*!
* onoffcanvas https://github.com/onokumus/onoffcanvas
* An offcanvas plugin
* @version: 2.3.1
* @author: Osman Nuri Okumuş <onokumus@gmail.com> (https://onokumus.com)
* @license: MIT
*/
const NAME = "onoffcanvas";
const EVENT_KEY = `.${NAME}`;
const EventName = {
    HIDE: `hide${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
};
const ClassName = {
    SHOW: "is-open",
};
const Selector = {
    DATA_TOGGLE: '[data-toggle="onoffcanvas"]',
};
const OcDefault = {
    createDrawer: true,
    hideByEsc: true,
};

function getSelectorFromElement(element) {
    let selector = element.getAttribute("data-target");
    if (!selector || selector === "#") {
        selector = element.getAttribute("href") || "";
    }
    try {
        const $selector = document.querySelectorAll(selector);
        return $selector.length > 0 ? selector : null;
    }
    catch (error) {
        throw new Error("Target Not Found!");
    }
}
function selectorArray(arrs) {
    const divArr = [];
    arrs.forEach((arr) => {
        const selector = getSelectorFromElement(arr);
        divArr.push(selector);
    });
    return divArr;
}
function isElement(element) {
    return Boolean(element.classList);
}

/**
 * @export
 * @class OnoffCanvas
 */
class OnoffCanvas {
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {Element | string} element
     * @param {OcOptions} [options]
     * @memberof OnoffCanvas
     */
    constructor(element, options) {
        this.element = isElement(element)
            ? element
            : document.querySelector(element);
        this.config = Object.assign(Object.assign({}, OcDefault), options);
        this.triggerElements = Array.from(document.querySelectorAll(`${Selector.DATA_TOGGLE}[href="#${this.element.id}"],
      ${Selector.DATA_TOGGLE}[data-target="#${this.element.id}"]`));
        this.addAriaExpanded(this.triggerElements);
        this.triggerElements.forEach((el) => {
            el.addEventListener("click", (event) => {
                const eventTarget = event.target;
                if (eventTarget && eventTarget.tagName === "A") {
                    event.preventDefault();
                }
                this.toggle();
            });
        });
        this.drawer = document.createElement("div");
        this.drawer.classList.add("onoffcanvas-drawer");
    }
    static attachTo(element, options) {
        return new OnoffCanvas(element, options);
    }
    /**
     * Auto init all OnoffCanvas elements
     *
     * @static
     * @param {boolean} [escKey]
     * @memberof OnoffCanvas
     */
    static autoinit(options = OcDefault) {
        const ocNodeList = document.querySelectorAll(`${Selector.DATA_TOGGLE}`);
        const ocListArr = [...ocNodeList];
        const selectorArr = selectorArray(ocListArr);
        const newOcArr = [...new Set(selectorArr)];
        newOcArr.forEach((noa) => {
            OnoffCanvas.attachTo(noa, options);
        });
    }
    on(event, handle) {
        this.listen(event, handle);
        return this;
    }
    /**
     * Show/Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    toggle() {
        if (this.element.classList.contains(ClassName.SHOW)) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /**
     * Show OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    show() {
        if (this.element.classList.contains(ClassName.SHOW)) {
            return;
        }
        this.element.classList.add(ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(EventName.SHOW, this.element);
        if (this.config.createDrawer) {
            document.documentElement.appendChild(this.drawer);
            this.drawer.classList.add("is-open");
            this.drawer.addEventListener("click", this.hide.bind(this));
        }
        if (this.config.hideByEsc) {
            window.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    this.hide();
                }
            });
        }
    }
    /**
     * Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    hide() {
        if (!this.element.classList.contains(ClassName.SHOW)) {
            return;
        }
        if (this.config.createDrawer) {
            this.drawer.classList.remove("is-open");
            this.drawer.removeEventListener("click", this.hide.bind(this));
            document.documentElement.removeChild(this.drawer);
        }
        this.element.classList.remove(ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(EventName.HIDE, this.element);
    }
    listen(event, handle) {
        this.element.addEventListener(event, handle, false);
        return this;
    }
    emit(evtType, target, shouldBubble = false) {
        const evt = new CustomEvent(evtType, {
            detail: target,
            bubbles: shouldBubble,
        });
        this.element.dispatchEvent(evt);
        return this;
    }
    addAriaExpanded(triggerElements) {
        const isOpen = this.element.classList.contains(ClassName.SHOW);
        triggerElements.forEach((tel) => {
            tel.setAttribute("aria-expanded", isOpen.toString());
        });
    }
}

export { OnoffCanvas as default };
//# sourceMappingURL=onoffcanvas.esm.js.map
