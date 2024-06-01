import { OcOptions, OnoffCanvasEvents } from "./constants";
/**
 * @export
 * @class OnoffCanvas
 */
export default class OnoffCanvas {
    static attachTo(element: HTMLElement | string, options?: OcOptions): OnoffCanvas;
    /**
     * Auto init all OnoffCanvas elements
     *
     * @static
     * @param {boolean} [escKey]
     * @memberof OnoffCanvas
     */
    static autoinit(options?: OcOptions): void;
    element: Element;
    config: OcOptions;
    private triggerElements;
    private drawer;
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {Element | string} element
     * @param {OcOptions} [options]
     * @memberof OnoffCanvas
     */
    constructor(element: Element | string, options?: OcOptions);
    on(event: OnoffCanvasEvents, handle: EventListener): this;
    /**
     * Show/Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    toggle(): void;
    /**
     * Show OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    show(): void;
    /**
     * Hide OnoffCanvas element
     *
     * @returns {void}
     * @memberof OnoffCanvas
     */
    hide(): void;
    private listen;
    private emit;
    private addAriaExpanded;
}
