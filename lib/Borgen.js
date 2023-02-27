"use strict";
/*!
 * Borgen
 * Copyright(c) 2023 Abel Misiocha.
 * MIT Licensed
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borgen = exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
}
exports.Logger = Logger;
/**
 *
 * @param infoColor The color of this bit`[2/27/2023, 7:43:40 PM] [INFO]`
 * @param messageColor The color of this bit`This is an informational message`
 * @param message The message you want logged `This is an informational message`
 * @example
 * ```js
 * Logger.error({message:'This is an info message',infoColor:'blue',messageColor:'cyan'});
 *
 * [2/27/2023, 3:57:45 PM] [INFO] Server is listening on port:3001
 * ```
 */
Logger.info = ({ message, infoColor, messageColor }) => {
    const infoCl = infoColor || 'blue';
    const messageCl = messageColor || 'blueBright';
    console.log(chalk_1.default[infoCl](`[${new Date().toLocaleString()}] [INFO]`), chalk_1.default[messageCl](message || 'Default info message'));
};
/**
 *
 * @param infoColor The color of this bit `[2/27/2023, 7:43:45 PM] [WARN]`
 * @param messageColor The color of this bit `This is a warning`
 * @param message The message you want logged `This is a warning`
 * @example
 * ```js
 * Logger.warn({message:'This is an warning',infoColor:'yellow',messageColor:'yellowBright'});
 *
 *  [2/27/2023, 3:57:48 PM] [ERROR] This is a warning
 * ```
 */
Logger.warn = ({ message, infoColor, messageColor }) => {
    const infoCl = infoColor || 'yellow';
    const messageCl = messageColor || 'yellowBright';
    console.log(chalk_1.default[infoCl].bold(`[${new Date().toLocaleString()}] [WARN]`), chalk_1.default[messageCl](message));
};
/**
 *
 * @param infoColor  The color of this bit `[2/27/2023, 3:57:48 PM] [ERROR]`
 * @param messageColor  The color of this bit  `This is an error message`
 * @param message The message you want logged  `This is an error message`
 * @example
 * ```js
 * Logger.error({message:'This is an error message',infoColor:'red',messageColor:'redBright'});
 *
 * [2/27/2023, 3:57:48 PM] [ERROR] This is route does not exist
 * ```
 */
Logger.error = ({ message, infoColor, messageColor }) => {
    const infoCl = infoColor || 'red';
    const messageCl = messageColor || 'redBright';
    console.log(chalk_1.default[infoCl].bold(`[${new Date().toLocaleString()}] [ERROR]`), chalk_1.default[messageCl](message));
};
/**
 *
 * @param methodColor The color of `[POST] Request`
 * @param routeColor The color of  `/api/v1/users/new`
 * @param statusColor The color of `Status:`
 * @param resTimeColor The color of `in 5 ms`
 * @param statusCodesCl The colors of diffrent status code ranges
 * ```js
 * //example
 * Borgen({
 * methodColor:{
 * GET:'greenBright',
 * POST:'yellow',
 * PUT:'gray',
 * PATCH:'gray',
 * DELETE:'redBright'
 * },
 * routeColor:'gray',
 * statusColor:'cyan',
 * resTimeColor:'gray',
 * statusCodesCl:{serverErr:'red', clientErr:'yellow', redirects:'cyan',success:'greenBright'
 * }})
 * ```
 * @example
 *  ```js
 *  [POST] Request path: /api/v1/users/new - Status:200 in 5 ms
 * ```
 */
const Borgen = ({ methodColor, routeColor, statusColor, resTimeColor, statusCodesCl }) => {
    const { serverErr, clientErr, redirects, success } = {
        serverErr: (statusCodesCl === null || statusCodesCl === void 0 ? void 0 : statusCodesCl.serverErr) || 'red',
        clientErr: (statusCodesCl === null || statusCodesCl === void 0 ? void 0 : statusCodesCl.clientErr) || 'yellow',
        redirects: (statusCodesCl === null || statusCodesCl === void 0 ? void 0 : statusCodesCl.redirects) || 'cyan',
        success: (statusCodesCl === null || statusCodesCl === void 0 ? void 0 : statusCodesCl.success) || 'greenBright'
    };
    const { GET, POST, PUT, PATCH, DELETE } = {
        GET: (methodColor === null || methodColor === void 0 ? void 0 : methodColor.GET) || 'greenBright',
        POST: (methodColor === null || methodColor === void 0 ? void 0 : methodColor.POST) || 'yellow',
        PUT: (methodColor === null || methodColor === void 0 ? void 0 : methodColor.PUT) || 'cyan',
        PATCH: (methodColor === null || methodColor === void 0 ? void 0 : methodColor.PATCH) || 'greenBright',
        DELETE: (methodColor === null || methodColor === void 0 ? void 0 : methodColor.DELETE) || 'redBright'
    };
    const routeCl = routeColor || 'gray';
    const statusCl = statusColor || 'cyan';
    const resTimeCl = resTimeColor || 'gray';
    return (req, res, next) => {
        const start = Date.now();
        const reqColor = res.on('finish', () => {
            const elapsed = Date.now() - start;
            console.log(chalk_1.default[req.method === 'GET' ? GET : req.method === 'POST' ? POST : req.method === 'PUT' ? PUT : req.method === 'PATCH' ? PATCH : req.method === 'DELETE' ? DELETE : 'greenBright'](`[${req.method}] Request`), ` URL: ${chalk_1.default[routeCl].bold(req.url)} - ${chalk_1.default[statusCl]('Status')}: ${res.statusCode >= 200 && res.statusCode < 300
                ? chalk_1.default[success].bold(res.statusCode)
                : res.statusCode >= 300 && res.statusCode < 400
                    ? chalk_1.default[redirects].bold(res.statusCode)
                    : res.statusCode >= 400 && res.statusCode < 500
                        ? chalk_1.default[clientErr].bold(res.statusCode)
                        : res.statusCode >= 500 && res.statusCode < 600
                            ? chalk_1.default[serverErr].bold(res.statusCode)
                            : chalk_1.default.yellowBright(res.statusCode)}`, chalk_1.default[resTimeCl].bold(`in ${elapsed} ms`));
        });
        next();
    };
};
exports.Borgen = Borgen;
