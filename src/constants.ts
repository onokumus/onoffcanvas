import { IOCDefault } from "./interface";

export const NAME = "onoffcanvas";
export const EVENT_KEY = `.${NAME}`;

export const EventName = {
  HIDE: `hide${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
};

export const ClassName = {
  SHOW: "is-open",
};

export const Selector = {
  DATA_TOGGLE: '[data-toggle="onoffcanvas"]',
};

export const OcDefault: IOCDefault = {
  createDrawer: true,
  hideByEsc: true,
};

export type OnoffCanvasEvents = "show.onoffcanvas" | "hide.onoffcanvas";
