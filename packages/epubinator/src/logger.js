"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var ramda_1 = require("ramda");
exports.info = chalk_1.blue;
exports.error = chalk_1.red;
exports.success = chalk_1.green;
exports.emphasize = chalk_1.bold;
exports.lineBreak = '\n';
exports.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log(args.join(' '));
};
exports.boldInfo = ramda_1.compose(chalk_1.blue, exports.emphasize);
