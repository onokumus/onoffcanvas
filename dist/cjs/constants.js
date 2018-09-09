/*!
* onoffcanvas - v2.2.3
* An offcanvas plugin
* https://github.com/onokumus/onoffcanvas
*
* Made by onokumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-d3b966f9.js');

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

exports.NAME = NAME;
exports.EVENT_KEY = EVENT_KEY;
exports.EventName = EventName;
exports.ClassName = ClassName;
exports.Selector = Selector;
exports.OcDefault = OcDefault;
