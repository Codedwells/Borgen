import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export class Logger {
    public static log = (args: any) => this.info(args);

    public static info = (args: any) => {
        console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);
    };
    public static warn = (args: any) => {
        console.log(chalk.yellow.bold(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
    };
    public static error = (args: any) => {
        console.log(chalk.red.bold(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);
    };
}

export const Borgen = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(
            chalk.green(`[${req.method}] Request`),
            ` URL: ${chalk.gray.bold(req.url)} - ${chalk.cyan('Status')}: ${res.statusCode === 200 ? chalk.greenBright.bold(200) : chalk.yellowBright.bold(res.statusCode)}`,
            chalk.gray.bold(`in ${elapsed} ms`)
        );
    });

    next();
};
