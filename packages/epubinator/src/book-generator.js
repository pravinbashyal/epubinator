"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ramda_1 = require("ramda");
var html_parser_1 = require("./html-parser");
var stripper_1 = require("./stripper");
var paginator_1 = require("./paginator");
var jsdom_1 = require("jsdom");
var jsdom_2 = require("./util/jsdom");
var logger_1 = require("./logger");
var generateBookChapters = function (url, chapters) {
    if (chapters === void 0) { chapters = []; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var urlInstance, dom, main, title, article, nextPageHref;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!url)
                        return [2 /*return*/, chapters];
                    logger_1.log(logger_1.info('Downloading page for'), ramda_1.compose(logger_1.info, logger_1.emphasize)(url));
                    urlInstance = new URL(url);
                    return [4 /*yield*/, html_parser_1.getDom(url)];
                case 1:
                    dom = _a.sent();
                    main = html_parser_1.getMain(dom, {
                        url: url,
                    });
                    title = ramda_1.compose(stripper_1.stripNbsp, stripper_1.stripHtmlAttributes)(html_parser_1.getTitle(main));
                    article = html_parser_1.getBodyHtmlFromDom(ramda_1.compose(html_parser_1.getArticle, html_parser_1.removeTitle)(main));
                    return [4 /*yield*/, paginator_1.getNextPageLink(dom)];
                case 2:
                    nextPageHref = _a.sent();
                    return [4 /*yield*/, generateBookChapters(html_parser_1.generateLink(urlInstance, nextPageHref), chapters.concat([
                            {
                                title: title,
                                data: article,
                            },
                        ]))];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.generateBookChapters = generateBookChapters;
var generateSinglePageBook = function (url) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var dom, main, title, toc, article, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, html_parser_1.getDom(url)];
            case 1:
                dom = _a.sent();
                main = html_parser_1.getMain(dom, {
                    url: url,
                });
                title = html_parser_1.getTitle(dom, { url: url });
                toc = html_parser_1.getBodyHtmlFromDom(generateToc(main, { id: 'toc' }));
                article = html_parser_1.getBodyHtmlFromDom(ramda_1.compose(html_parser_1.getArticle, html_parser_1.removeToc, html_parser_1.removeTitle)(main));
                data = toc.concat(article);
                return [2 /*return*/, {
                        title: title && ramda_1.compose(stripper_1.stripNbsp, stripper_1.stripHtmlAttributes)(title),
                        content: [
                            {
                                data: data,
                            },
                        ],
                    }];
        }
    });
}); };
exports.generateSinglePageBook = generateSinglePageBook;
// TODO write specific function
function generateToc(dom, context) {
    if (context === void 0) { context = {}; }
    var document = jsdom_2.getDocument(dom);
    var tableOfContent = document.querySelector("#" + context.id);
    if (!tableOfContent)
        return;
    return new jsdom_1.JSDOM(tableOfContent.outerHTML);
}
