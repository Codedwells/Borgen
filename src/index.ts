/*!
 * Borgen
 *
 * Copyright(c) 2023 Abel Misiocha.
 *
 * MIT Licensed
 */

import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

type colorTypes =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'blackBright'
    | 'redBright'
    | 'gray'
    | 'grey'
    | 'greenBright'
    | 'yellowBright'
    | 'blueBright'
    | 'magentaBright'
    | 'cyanBright'
    | 'whiteBright';

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

export class Logger {
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
    public static info = ({ message, infoColor, messageColor }: loggerParams) => {
        const infoCl = infoColor || 'blue';
        const messageCl = messageColor || 'blueBright';

        console.log(chalk[infoCl](`[${new Date().toLocaleString()}] [INFO]`), chalk[messageCl](message || 'Default info message'));
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
    public static warn = ({ message, infoColor, messageColor }: loggerParams) => {
        const infoCl = infoColor || 'yellow';
        const messageCl = messageColor || 'yellowBright';

        console.log(chalk[infoCl].bold(`[${new Date().toLocaleString()}] [WARN]`), chalk[messageCl](message));
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
    public static error = ({ message, infoColor, messageColor }: loggerParams) => {
        const infoCl = infoColor || 'red';
        const messageCl = messageColor || 'redBright';

        console.log(chalk[infoCl].bold(`[${new Date().toLocaleString()}] [ERROR]`), chalk[messageCl](message));
    };
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
export const Borgen = ({ methodColor, routeColor, statusColor, resTimeColor, statusCodesCl }: BorgenParams) => {
    const { serverErr, clientErr, redirects, success } = {
        serverErr: statusCodesCl?.serverErr || 'red',
        clientErr: statusCodesCl?.clientErr || 'yellow',
        redirects: statusCodesCl?.redirects || 'cyan',
        success: statusCodesCl?.success || 'greenBright'
    };
    const { GET, POST, PUT, PATCH, DELETE } = {
        GET: methodColor?.GET || 'greenBright',
        POST: methodColor?.POST || 'yellow',
        PUT: methodColor?.PUT || 'cyan',
        PATCH: methodColor?.PATCH || 'greenBright',
        DELETE: methodColor?.DELETE || 'redBright'
    };

    const routeCl = routeColor || 'gray';
    const statusCl = statusColor || 'cyan';
    const resTimeCl = resTimeColor || 'gray';

    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();
        const reqColor = res.on('finish', () => {
            const elapsed = Date.now() - start;
            console.log(
                chalk[req.method === 'GET' ? GET : req.method === 'POST' ? POST : req.method === 'PUT' ? PUT : req.method === 'PATCH' ? PATCH : req.method === 'DELETE' ? DELETE : 'greenBright'](
                    `[${req.method}] Request`
                ),
                ` URL: ${chalk[routeCl].bold(req.url)} - ${chalk[statusCl]('Status')}: ${
                    res.statusCode >= 200 && res.statusCode < 300
                        ? chalk[success].bold(res.statusCode)
                        : res.statusCode >= 300 && res.statusCode < 400
                        ? chalk[redirects].bold(res.statusCode)
                        : res.statusCode >= 400 && res.statusCode < 500
                        ? chalk[clientErr].bold(res.statusCode)
                        : res.statusCode >= 500 && res.statusCode < 600
                        ? chalk[serverErr].bold(res.statusCode)
                        : chalk.yellowBright(res.statusCode)
                }`,
                chalk[resTimeCl].bold(`in ${elapsed} ms`)
            );
        });

        next();
    };
};
