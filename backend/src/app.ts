import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middleware/errorHandler';
// import { apiRouter } from './routes';

export const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(ErrorHandler);

// app.use('/api', apiRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
