declare class OnoffCanvas {
    element: any;
    private triggerElements;
    constructor(element: any);
    private toggle();
    private show();
    private hide();
    private addAriaExpanded(triggerElements);
}
declare function getSelectorFromElement(element: any): any;
declare function getTargetFromTrigger(element: any): any;
declare let onoffcanvas: NodeListOf<Element>;
