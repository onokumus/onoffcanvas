/*!
* onoffcanvas - v2.2.4
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
var NAME = "onoffcanvas";
var EVENT_KEY = "." + NAME;
var EventName = {
    HIDE: "hide" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
};
var ClassName = {
    SHOW: "is-open",
};
var Selector = {
    DATA_TOGGLE: '[data-toggle="onoffcanvas"]',
};
var OcDefault = {
    createDrawer: true,
    hideByEsc: true,
};

export { ClassName, EVENT_KEY, EventName, NAME, OcDefault, Selector };
