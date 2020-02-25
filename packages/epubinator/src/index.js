"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styles_1 = require("./styles");
var book_generator_1 = require("./book-generator");
var Epub = require('epub-gen');
/**
 * main
 *
 * @param url
 * @param options
 * @returns void
 */
function main(url, options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var content, config, book, chapters, option;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = options.content, config = tslib_1.__rest(options, ["content"]);
                    book = {};
                    if (!options.multiurl) return [3 /*break*/, 2];
                    return [4 /*yield*/, book_generator_1.generateBookChapters(url)];
                case 1:
                    chapters = _a.sent();
                    book.content = chapters;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, book_generator_1.generateSinglePageBook(url)];
                case 3:
                    book = _a.sent();
                    _a.label = 4;
                case 4:
                    option = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ author: '', publisher: '', css: styles_1.default }, config), book), { title: options.title });
                    new Epub(option, __dirname + ("/../dist/" + (option.title || 'output') + ".epub"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
