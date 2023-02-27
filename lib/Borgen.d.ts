/*!
 * Borgen
 * Copyright(c) 2023 Abel Misiocha.
 * MIT Licensed
 */
import { Request, Response, NextFunction } from 'express';
type colorTypes = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'blackBright' | 'redBright' | 'gray' | 'grey' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';
type loggerParams = {
    message: string;
    infoColor?: colorTypes;
    messageColor?: colorTypes;
};
type statusCodeType = {
    serverErr?: colorTypes;
    clientErr?: colorTypes;
    redirects?: colorTypes;
    success?: colorTypes;
};
type methodType = {
    GET?: colorTypes;
    POST?: colorTypes;
    PUT?: colorTypes;
    PATCH?: colorTypes;
    DELETE?: colorTypes;
};
type BorgenParams = {
    methodColor?: methodType;
    routeColor?: colorTypes;
    statusColor?: colorTypes;
    resTimeColor?: colorTypes;
    statusCodesCl?: statusCodeType;
};
export declare class Logger {
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
    static info: ({ message, infoColor, messageColor }: loggerParams) => void;
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
    static warn: ({ message, infoColor, messageColor }: loggerParams) => void;
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
    static error: ({ message, infoColor, messageColor }: loggerParams) => void;
}
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
export declare const Borgen: ({ methodColor, routeColor, statusColor, resTimeColor, statusCodesCl }: BorgenParams) => (req: Request, res: Response, next: NextFunction) => void;
export {};
