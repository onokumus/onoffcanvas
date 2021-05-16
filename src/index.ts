import {
  ClassName,
  EventName,
  OcDefault,
  OnoffCanvasEvents,
  Selector,
} from "./constants";
import { IOCDefault } from "./interface";
import { isElement, selectorArray, uniqueArr } from "./util";

/**
 *
 * @export
 * @class OnoffCanvas
 */
export default class OnoffCanvas {
  public static attachTo(
    element: HTMLElement | string,
    options?: IOCDefault,
  ): OnoffCanvas {
    return new OnoffCanvas(element, options);
  }

  /**
   * Auto init all OnoffCanvas elements
   *
   * @static
   * @param {boolean} [escKey]
   * @memberof OnoffCanvas
   */
  public static autoinit(options = OcDefault) {
    const ocNodeList = document.querySelectorAll(`${Selector.DATA_TOGGLE}`);

    const ocListArr = [].slice.call(ocNodeList);

    const selectorArr = selectorArray(ocListArr);

    const newOcArr = uniqueArr(selectorArr);

    // eslint-disable-next-line no-restricted-syntax
    for (const element of newOcArr) {
      OnoffCanvas.attachTo(element, options);
    }
  }

  public element: Element;

  public config: IOCDefault;

  private triggerElements: Element[];

  private drawer: HTMLDivElement;

  /**
   * Creates an instance of OnoffCanvas.
   *
   * @constructor
   * @param {Element | string} element
   * @param {IOCDefault} [options]
   * @memberof OnoffCanvas
   */
  constructor(element: Element | string, options?: IOCDefault) {
    this.element = isElement(element)
      ? element
      : document.querySelector<HTMLElement>(element)!;
    this.config = { ...OcDefault, ...options };

    this.triggerElements = [].slice.call(
      document.querySelectorAll<HTMLElement>(
        `${Selector.DATA_TOGGLE}[href="#${this.element.id}"],
      ${Selector.DATA_TOGGLE}[data-target="#${this.element.id}"]`,
      ),
    );

    this.addAriaExpanded(this.triggerElements);

    this.triggerElements.forEach((el: Element) => {
      el.addEventListener("click", (event) => {
        const eventTarget = event.target as Element | null;
        if (eventTarget && eventTarget.tagName === "A") {
          event.preventDefault();
        }
        this.toggle();
      });
    });

    this.drawer = document.createElement("div");
    this.drawer.classList.add("onoffcanvas-drawer");
  }

  public on(event: OnoffCanvasEvents, handle: EventListener) {
    this.listen(event, handle);
    return this;
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
    this.emit(EventName.SHOW, this.element);

    if (this.config.createDrawer) {
      document.documentElement.appendChild(this.drawer);
      this.drawer.classList.add("is-open");
      this.drawer.addEventListener("click", this.hide.bind(this));
    }

    if (this.config.hideByEsc) {
      window.addEventListener("keydown", (event) => {
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

    if (this.config.createDrawer) {
      this.drawer.classList.remove("is-open");
      this.drawer.removeEventListener("click", this.hide.bind(this));
      document.documentElement.removeChild(this.drawer);
    }

    this.element.classList.remove(ClassName.SHOW);
    this.addAriaExpanded(this.triggerElements);
    this.emit(EventName.HIDE, this.element);
  }

  private listen(event: string, handle: EventListener) {
    this.element.addEventListener(event, handle, false);
    return this;
  }

  private emit<T extends object>(
    evtType: string,
    target: T,
    shouldBubble = false,
  ) {
    let evt;
    if (typeof CustomEvent === "function") {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
      });
    } else {
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(evtType, shouldBubble, false, target);
    }

    this.element.dispatchEvent(evt);
    return this;
  }

  private addAriaExpanded(triggerElements: Element[]): void {
    const isOpen = this.element.classList.contains(ClassName.SHOW);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Array.prototype.forEach.call(triggerElements, (el, i) => {
      el.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
}
