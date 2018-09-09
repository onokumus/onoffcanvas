/*!
* onoffcanvas - v2.2.3
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
import { a as __assign } from './chunk-6fed8d7d.js';

var NAME = "onoffcanvas";
var EVENT_KEY = "." + NAME;
var EventName = {
    HIDE: "hide" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY
};
var ClassName = {
    SHOW: "is-open"
};
var Selector = {
    DATA_TOGGLE: '[data-toggle="onoffcanvas"]'
};
var OcDefault = {
    createDrawer: true,
    hideByEsc: true
};

export { NAME, EVENT_KEY, EventName, ClassName, Selector, OcDefault };
