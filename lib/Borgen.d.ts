import { Request, Response, NextFunction } from 'express';
export declare class Logger {
    static log: (args: any) => void;
    static info: (args: any) => void;
    static warn: (args: any) => void;
    static error: (args: any) => void;
}
export declare const Borgen: (req: Request, res: Response, next: NextFunction) => void;
