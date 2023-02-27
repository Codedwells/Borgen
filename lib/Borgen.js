"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borgen = exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
}
exports.Logger = Logger;
_a = Logger;
Logger.log = (args) => _a.info(args);
Logger.info = (args) => {
    console.log(chalk_1.default.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
};
Logger.warn = (args) => {
    console.log(chalk_1.default.yellow.bold(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
};
Logger.error = (args) => {
    console.log(chalk_1.default.red.bold(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
};
const Borgen = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(chalk_1.default.green(`[${req.method}] Request`), ` URL: ${chalk_1.default.gray.bold(req.url)} - ${chalk_1.default.cyan('Status')}: ${res.statusCode === 200 ? chalk_1.default.greenBright.bold(200) : chalk_1.default.yellowBright.bold(res.statusCode)}`, chalk_1.default.gray.bold(`in ${elapsed} ms`));
    });
    next();
};
exports.Borgen = Borgen;
