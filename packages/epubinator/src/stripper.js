"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * stripNbsp
 *
 * @param {string} html
 * @returns {string}
 */
function stripNbsp(html) {
    var nbspRegex = /&nbsp;/gi;
    return html.replace(nbspRegex, ' ');
}
exports.stripNbsp = stripNbsp;
/**
 * stripSpan
 *
 * @param {string} html
 * @returns {string}
 */
function stripHtmlAttributes(html) {
    var spanRegex = /<\s*[^>]*>|<\/\s*[^>]*>/gi;
    return html.replace(spanRegex, '');
}
exports.stripHtmlAttributes = stripHtmlAttributes;
