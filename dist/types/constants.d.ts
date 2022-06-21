export interface OcOptions {
    createDrawer?: boolean;
    hideByEsc?: boolean;
}
export declare const NAME = "onoffcanvas";
export declare const EVENT_KEY: string;
export declare const EventName: {
    HIDE: string;
    SHOW: string;
};
export declare const ClassName: {
    SHOW: string;
};
export declare const Selector: {
    DATA_TOGGLE: string;
};
export declare const OcDefault: OcOptions;
export declare type OnoffCanvasEvents = "show.onoffcanvas" | "hide.onoffcanvas";
