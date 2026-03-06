
export interface OcOptions {
  createDrawer?: boolean;
  hideByEsc?: boolean;
}

export const NAME = "onoffcanvas";
export const EVENT_KEY: string = `.${NAME}`;

export const EventName: { HIDE: string; SHOW: string } = {
  HIDE: `hide${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
};

export const ClassName = {
  SHOW: "is-open",
};

export const Selector = {
  DATA_TOGGLE: '[data-toggle="onoffcanvas"]',
};

export const OcDefault: OcOptions = {
  createDrawer: true,
  hideByEsc: true,
};

export type OnoffCanvasEvents = "show.onoffcanvas" | "hide.onoffcanvas";

export function getSelectorFromElement(element: Element): string | null {
  let selector = element.getAttribute("data-target");
  if (!selector || selector === "#") {
    selector = element.getAttribute("href") || "";
  }
  try {
    const $selector = document.querySelectorAll(selector);
    return $selector.length > 0 ? selector : null;
  } catch (error) {
    throw new Error("Target Not Found!");
  }
}

export function selectorArray(arrs: any[]): any[] {
  return arrs.map((arr) => getSelectorFromElement(arr)!);
}

export function isElement(element: unknown): element is Element {
  return Boolean((element as Element).classList);
}

/**
 * @export
 * @class OnoffCanvas
 */
class OnoffCanvas {
  public static attachTo(
    element: HTMLElement | string,
    options?: OcOptions,
  ): OnoffCanvas {
    return new OnoffCanvas(element, options);
  }

  /**
   * Auto init all OnoffCanvas elements
   */
  public static autoinit(options = OcDefault) {
    const ocNodeList = document.querySelectorAll(`${Selector.DATA_TOGGLE}`);
    const selectorArr = selectorArray([...ocNodeList]);
    const newOcArr = [...new Set(selectorArr)].filter(s => s !== null);
    newOcArr.forEach((noa) => {
      OnoffCanvas.attachTo(noa, options);
    });
  }

  public element: HTMLElement;
  public config: OcOptions;
  private triggerElements: HTMLElement[];
  private drawer: HTMLDivElement;
  private lastActiveElement: HTMLElement | null = null;

  // Bound handlers for proper event removal
  private handleEscapeKeyBound: (event: KeyboardEvent) => void;
  private handleDrawerClickBound: () => void;
  private handleTriggerClickBound: (event: MouseEvent) => void;

  /**
   * Creates an instance of OnoffCanvas.
   */
  constructor(element: Element | string, options?: OcOptions) {
    const el = isElement(element)
      ? element
      : document.querySelector<HTMLElement>(element);

    if (!el) {
      throw new Error("Target Element Not Found!");
    }

    this.element = el as HTMLElement;
    this.config = { ...OcDefault, ...options };

    this.triggerElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        `${Selector.DATA_TOGGLE}[href="#${this.element.id}"],${Selector.DATA_TOGGLE}[data-target="#${this.element.id}"]`,
      ),
    );

    // Initialize bound handlers
    this.handleEscapeKeyBound = this.handleEscapeKey.bind(this);
    this.handleDrawerClickBound = this.hide.bind(this);
    this.handleTriggerClickBound = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      if (target.tagName === "A") {
        event.preventDefault();
      }
      this.toggle();
    };

    this.addAriaExpanded(this.triggerElements);
    this.triggerElements.forEach((el) => {
      el.addEventListener("click", this.handleTriggerClickBound as EventListener);
    });

    this.drawer = document.createElement("div");
    this.drawer.classList.add("onoffcanvas-drawer");
    this.drawer.setAttribute('aria-hidden', 'true');
  }

  public on(event: OnoffCanvasEvents, handle: EventListener): OnoffCanvas {
    this.listen(event, handle);
    return this;
  }

  /**
   * Show/Hide OnoffCanvas element
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
   */
  public show(): void {
    if (this.element.classList.contains(ClassName.SHOW)) {
      return;
    }

    // Save active element to restore focus later
    this.lastActiveElement = document.activeElement as HTMLElement;

    this.element.classList.add(ClassName.SHOW);
    this.addAriaExpanded(this.triggerElements);
    this.emit(EventName.SHOW, { instance: this, element: this.element });

    if (this.config.createDrawer) {
      document.body.appendChild(this.drawer);
      // Wait for next frame to ensure visibility transition works if any
      requestAnimationFrame(() => {
        this.drawer.classList.add("is-open");
      });
      this.drawer.addEventListener("click", this.handleDrawerClickBound);
    }

    if (this.config.hideByEsc) {
      window.addEventListener("keydown", this.handleEscapeKeyBound);
    }

    // A11y: Move focus to the panel
    this.element.setAttribute('aria-hidden', 'false');
    this.element.focus();
  }

  /**
   * Hide OnoffCanvas element
   */
  public hide(): void {
    if (!this.element.classList.contains(ClassName.SHOW)) {
      return;
    }

    if (this.config.createDrawer) {
      this.drawer.classList.remove("is-open");
      this.drawer.removeEventListener("click", this.handleDrawerClickBound);
      // Wait for transition if needed, but for now simple remove
      setTimeout(() => {
        if (this.drawer.parentNode) {
          document.body.removeChild(this.drawer);
        }
      }, 300); // Should match CSS transition duration
    }

    if (this.config.hideByEsc) {
      window.removeEventListener("keydown", this.handleEscapeKeyBound);
    }

    this.element.classList.remove(ClassName.SHOW);
    this.element.setAttribute('aria-hidden', 'true');
    this.addAriaExpanded(this.triggerElements);
    this.emit(EventName.HIDE, { instance: this, element: this.element });

    // A11y: Restore focus
    if (this.lastActiveElement) {
      this.lastActiveElement.focus();
    }
  }

  /**
   * Completely destroy the instance and clean up listeners
   */
  public destroy(): void {
    this.hide();
    this.triggerElements.forEach((el) => {
      el.removeEventListener("click", this.handleTriggerClickBound as EventListener);
    });
    this.triggerElements = [];
    (this.element as any) = null;
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.hide();
    }
  }

  private listen(event: string, handle: EventListener) {
    this.element.addEventListener(event, handle, false);
    return this;
  }

  private emit<T extends object>(
    evtType: string,
    detail: T,
    shouldBubble = false,
  ) {
    const evt = new CustomEvent(evtType, {
      detail,
      bubbles: shouldBubble,
    });

    this.element.dispatchEvent(evt);
    return this;
  }

  private addAriaExpanded(triggerElements: HTMLElement[]): void {
    const isOpen = this.element.classList.contains(ClassName.SHOW);
    triggerElements.forEach((tel) => {
      tel.setAttribute("aria-expanded", isOpen.toString());
    });
  }
}

// Export both as default and named export
export default OnoffCanvas;
export { OnoffCanvas as Onoffcanvas };

