"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getNextPageLink = function (dom) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var document, next, link;
    return tslib_1.__generator(this, function (_a) {
        document = dom.window.document;
        next = document.querySelector('[rel="next"]');
        if (!next) {
            return [2 /*return*/];
        }
        if (!next.href) {
            console.log('cannot find next page');
            return [2 /*return*/];
        }
        link = next.href;
        if (!link)
            return [2 /*return*/];
        return [2 /*return*/, link];
    });
}); };
exports.getNextPageLink = getNextPageLink;
