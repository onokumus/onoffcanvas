import {
  ClassName,
  EventName,
  OcDefault,
  OcOptions,
  OnoffCanvasEvents,
  Selector,
} from "./constants";
import { isElement, selectorArray } from "./util";

/**
 * @export
 * @class OnoffCanvas
 */
export default class OnoffCanvas {
  public static attachTo(
    element: HTMLElement | string,
    options?: OcOptions,
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

    const ocListArr = [...ocNodeList];

    const selectorArr = selectorArray(ocListArr);

    const newOcArr = [...new Set(selectorArr)];
    newOcArr.forEach((noa) => {
      OnoffCanvas.attachTo(noa, options);
    });
  }

  public element: Element;

  public config: OcOptions;

  private triggerElements: Element[];

  private drawer: HTMLDivElement;

  /**
   * Creates an instance of OnoffCanvas.
   *
   * @constructor
   * @param {Element | string} element
   * @param {OcOptions} [options]
   * @memberof OnoffCanvas
   */
  constructor(element: Element | string, options?: OcOptions) {
    this.element = isElement(element)
      ? element
      : document.querySelector<HTMLElement>(element)!;
    this.config = { ...OcDefault, ...options };

    this.triggerElements = Array.from(
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
    const evt = new CustomEvent(evtType, {
      detail: target,
      bubbles: shouldBubble,
    });

    this.element.dispatchEvent(evt);
    return this;
  }

  private addAriaExpanded(triggerElements: Element[]): void {
    const isOpen = this.element.classList.contains(ClassName.SHOW);
    triggerElements.forEach((tel) => {
      tel.setAttribute("aria-expanded", isOpen.toString());
    });
  }
}
