import { selectorArray, uniqueArr } from "./util";
import { EventEmitter } from "events";
import { ClassName, Selector, EventName, OcDefault } from "./constants";
import { IOCDefault } from "./interface";

/**
 *
 *
 * @export
 * @class OnoffCanvas
 * @extends {EventEmitter}
 */
export default class OnoffCanvas extends EventEmitter {
  triggerElements: NodeList;
  element: HTMLElement;
  config: IOCDefault;

  /**
   * Creates an instance of OnoffCanvas.
   * 
   * @constructor
   * @param {HTMLElement} _element
   * @param {IOCDefault} [options]
   * @memberof OnoffCanvas
   */
  constructor(_element: HTMLElement, options?: IOCDefault) {
    super();
    this.element =
      typeof _element === "string"
        ? document.querySelector(_element)
        : _element;

    this.config = Object.assign({}, OcDefault, options);

    this.triggerElements = document.querySelectorAll(
      `${Selector.DATA_TOGGLE}[href="#${this.element.id}"],
      ${Selector.DATA_TOGGLE}[data-target="#${this.element.id}"]`
    );

    this.addAriaExpanded(this.triggerElements);

    const triggers = [].slice.call(this.triggerElements);
    for (let i = 0; i < triggers.length; i++) {
      const trigger = triggers[i];
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
  public toggle(): void {
    if (this.element.classList.contains(ClassName.SHOW)) {
      this.hide();
    } else {
      this.show();
    }
  }


  /**
   * Show OnoffCanvas element
   * 
   * @returns {void}
   * @memberof OnoffCanvas
   */
  public show(): void {
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
  public hide(): void {
    if (!this.element.classList.contains(ClassName.SHOW)) {
      return;
    }
    this.element.classList.remove(ClassName.SHOW);
    this.addAriaExpanded(this.triggerElements);
    this.emit(EventName.HIDE, this);
  }

  private addAriaExpanded(triggerElements): void {
    const isOpen = this.element.classList.contains(ClassName.SHOW);

    Array.prototype.forEach.call(triggerElements, (el, i) => {
      el.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }


  /**
   * Auto init all OnoffCanvas elements
   *
   * @static
   * @param {boolean} [escKey] - whether W3C keyboard shortcuts are enabled
   * @memberof OnoffCanvas
   */
  static autoinit(escKey?: boolean) {
    const ocNodeList = document.querySelectorAll(`${Selector.DATA_TOGGLE}`);

    const ocListArr = [].slice.call(ocNodeList);

    const selectorArr = selectorArray(ocListArr);

    const newOcArr = uniqueArr(selectorArr);

    for (let i = 0; i < newOcArr.length; i++) {
      const element = newOcArr[i];

      if (!(this instanceof OnoffCanvas)) {
        new OnoffCanvas(document.querySelector(element), { hideByEsc: escKey });
      }
    }
  }
}
