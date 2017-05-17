/**
 * onoffcanvas - An offcanvas plugin
 * @version v2.0.0
 * @link https://github.com/onokumus/onoffcanvas#readme
 * @license MIT
 */
declare class OnoffCanvas {
    element: any;
    triggerElements: NodeList;
    constructor(element: any);
    toggle(): void;
    show(): void;
    hide(): void;
    addAriaExpanded(triggerElements: any): void;
}
declare function getSelectorFromElement(element: any): any;
declare function getTargetFromTrigger(element: any): any;
declare var onoffcanvas: NodeListOf<Element>;
