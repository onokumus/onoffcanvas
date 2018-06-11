/// <reference types="node" />
import { EventEmitter } from "events";
import { IOCDefault } from "./interface";
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
    static autoinit(escKey?: boolean): void;
    element: HTMLElement;
    config: IOCDefault;
    private triggerElements;
    /**
     * Creates an instance of OnoffCanvas.
     *
     * @constructor
     * @param {HTMLElement} _element
     * @param {IOCDefault} [options]
     * @memberof OnoffCanvas
     */
    constructor(element: HTMLElement, options?: IOCDefault);
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
    private addAriaExpanded;
}
