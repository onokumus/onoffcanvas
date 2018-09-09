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

function getSelectorFromElement(element) {
    var selector = element.getAttribute("data-target");
    if (!selector || selector === "#") {
        selector = element.getAttribute("href") || "";
    }
    try {
        var $selector = document.querySelectorAll(selector);
        return $selector.length > 0 ? selector : null;
    }
    catch (error) {
        throw new Error("Target Not Found!");
    }
}
function uniqueArr(arr) {
    var uniqueArray = arr.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });
    return uniqueArray;
}
function selectorArray(arrs) {
    var divArr = [];
    for (var _i = 0, arrs_1 = arrs; _i < arrs_1.length; _i++) {
        var element = arrs_1[_i];
        var selector = getSelectorFromElement(element);
        divArr.push(selector);
    }
    return divArr;
}

exports.getSelectorFromElement = getSelectorFromElement;
exports.uniqueArr = uniqueArr;
exports.selectorArray = selectorArray;
