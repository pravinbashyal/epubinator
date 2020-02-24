"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
console.log();
var content = fs_1.readFileSync(__dirname + '/textfiles/stylestext.css', {
    encoding: 'utf-8',
});
exports.default = content;
