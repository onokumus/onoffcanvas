import { OnoffCanvasEvents } from "./constants";
import { IOCDefault } from "./interface";
/**
 *
 * @export
 * @class OnoffCanvas
 */
export default class OnoffCanvas {
    /**
     * Auto init all OnoffCanvas elements
     *
     * @static
     * @param {boolean} [escKey]
     * @memberof OnoffCanvas
     */
    static autoinit(options?: IOCDefault): void;
    element: HTMLElement;
    config: IOCDefault;
    private triggerElements;
    private drawer;
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {HTMLElement | string} element
     * @param {IOCDefault} [options]
     * @memberof OnoffCanvas
     */
    constructor(element: HTMLElement | string, options?: IOCDefault);
    on(event: OnoffCanvasEvents, handle: any): this;
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
