"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_fetch_1 = require("node-fetch");
var jsdom_1 = require("jsdom");
var jsdom_2 = require("./util/jsdom");
/**
 * getDom
 *
 * @param url
 * @returns Promise<JSDOM>
 */
function getDom(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var response, html, dom;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    html = _a.sent();
                    dom = new jsdom_1.JSDOM(html);
                    return [2 /*return*/, dom];
            }
        });
    });
}
exports.getDom = getDom;
/**
 * getArticle
 *
 * @param dom
 * @param context
 * @returns JSDOM object
 */
function getArticle(dom, context) {
    if (context === void 0) { context = {}; }
    var document = jsdom_2.getDocument(dom);
    var article = document.querySelector('article') || document.querySelector('body');
    if (!article) {
        throw new Error("cannot find article. describe the article explicitly " + JSON.stringify(context));
    }
    return new jsdom_1.JSDOM(article.outerHTML);
}
exports.getArticle = getArticle;
function removeToc(dom) {
    var document = jsdom_2.getDocument(dom);
    var toc = document.querySelector('#toc');
    if (toc)
        toc.remove();
    return new jsdom_1.JSDOM(document.documentElement.outerHTML);
}
exports.removeToc = removeToc;
/**
 * getBodyHtmlFromDom
 *
 * @param {JSDOM} dom
 * @returns {string}
 */
function getBodyHtmlFromDom(dom) {
    if (!dom)
        return '';
    return dom.window.document.querySelector('body').innerHTML;
}
exports.getBodyHtmlFromDom = getBodyHtmlFromDom;
/**
 * getTitle
 *
 * @param {JSDOM} dom
 * @param {ContextType} context={}
 * @returns {string}
 */
function getTitle(dom, context) {
    if (context === void 0) { context = {}; }
    var document = jsdom_2.getDocument(dom);
    var titleElement = document.querySelector('h1');
    if (!titleElement) {
        console.log("cannot find title at " + context.url);
        return undefined;
    }
    return titleElement.innerHTML;
}
exports.getTitle = getTitle;
/**
 * removeTitle
 *
 * @param {JSDOM} dom
 * @returns {JSDOM}
 */
function removeTitle(dom) {
    // TODO: immutability
    var document = jsdom_2.getDocument(dom);
    var titleElement = document.querySelector('h1');
    if (!titleElement) {
        return dom;
    }
    titleElement.remove();
    return dom;
}
exports.removeTitle = removeTitle;
function getFallbackTitleContent(dom) {
    var title = jsdom_2.getDocument(dom).querySelector('h1');
    return title.parentElement;
}
/**
 * getMain
 *
 * @param {JSDOM} dom
 * @param {ContextType} context={}
 * @returns {JSDOM}
 */
function getMain(dom, context) {
    if (context === void 0) { context = {}; }
    var document = jsdom_2.getDocument(dom);
    var fallbackTitleContent = getFallbackTitleContent(dom);
    var main = document.querySelector('main') ||
        document.querySelector('.content') ||
        document.querySelector("[role='main']") ||
        document.querySelector('#main') ||
        fallbackTitleContent ||
        document.querySelector('body');
    if (!main) {
        throw new Error("cannot find main. describe the main explicitly at " + context.url + " " + dom.window.document.documentElement.outerHTML);
    }
    return new jsdom_1.JSDOM(main.outerHTML);
}
exports.getMain = getMain;
