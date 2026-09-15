import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
// import { apiRouter } from './routes';

export const app: Application = express();

app.use(cookieParser());
app.use(express.json());

// app.use('/api', apiRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
