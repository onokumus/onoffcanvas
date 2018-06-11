import { EventEmitter } from "events";
import { ClassName, EventName, OcDefault, Selector } from "./constants";
import { selectorArray, uniqueArr } from "./util";
/**
 *
 * @export
 * @class OnoffCanvas
 * @extends {EventEmitter}
 */
export default class OnoffCanvas extends EventEmitter {
    /**
     * Auto init all OnoffCanvas elements
     *
     * @static
     * @param {boolean} [escKey]
     * @memberof OnoffCanvas
     */
    static autoinit(escKey) {
        const ocNodeList = document.querySelectorAll(`${Selector.DATA_TOGGLE}`);
        const ocListArr = [].slice.call(ocNodeList);
        const selectorArr = selectorArray(ocListArr);
        const newOcArr = uniqueArr(selectorArr);
        for (const element of newOcArr) {
            newOnoffCanvas(element, escKey);
        }
    }
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {HTMLElement} _element
     * @param {IOCDefault} [options]
     * @memberof OnoffCanvas
     */
    constructor(element, options) {
        super();
        this.element =
            typeof element === "string" ? document.querySelector(element) : element;
        this.config = Object.assign({}, OcDefault, options);
        this.triggerElements = document.querySelectorAll(`${Selector.DATA_TOGGLE}[href="#${this.element.id}"],
      ${Selector.DATA_TOGGLE}[data-target="#${this.element.id}"]`);
        this.addAriaExpanded(this.triggerElements);
        const triggers = [].slice.call(this.triggerElements);
        for (const trigger of triggers) {
            trigger.addEventListener("click", event => {
                if (event.currentTarget.tagName === "A") {
                    event.preventDefault();
                }
                this.toggle();
            });
        }
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
        this.emit(EventName.SHOW, this);
        if (this.config.hideByEsc) {
            window.addEventListener("keydown", event => {
                if (event.keyCode === 27) {
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
        this.element.classList.remove(ClassName.SHOW);
        this.addAriaExpanded(this.triggerElements);
        this.emit(EventName.HIDE, this);
    }
    addAriaExpanded(triggerElements) {
        const isOpen = this.element.classList.contains(ClassName.SHOW);
        Array.prototype.forEach.call(triggerElements, (el, i) => {
            el.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }
}
function newOnoffCanvas(element, escKey) {
    const newOnoffcanvas = new OnoffCanvas(document.querySelector(element), {
        hideByEsc: escKey
    });
}
