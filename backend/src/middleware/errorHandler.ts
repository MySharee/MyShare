import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../utils/Error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err.stack);
        res.status(500).send('Something broke! :(');
    }
};

export default errorHandler;
