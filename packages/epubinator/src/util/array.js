"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fold = function (_a) {
    var _b = tslib_1.__read(_a, 1), item = _b[0];
    return item;
};
exports.fold = fold;
var log = function (id) { return function (val) {
    console.log(id, val);
    return val;
}; };
exports.log = log;
