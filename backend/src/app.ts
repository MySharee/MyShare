import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middleware/errorHandler';

export const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(ErrorHandler);


const apiRouter = express.Router();

import authRouter from './routes/auth';
apiRouter.use('/auth', authRouter);

import notesRouter from './routes/notes';
apiRouter.use('/notes', notesRouter);

import usersRouter from './routes/users';
apiRouter.use('/users', usersRouter);

import instanceRouter from './routes/instance';
apiRouter.use('/', instanceRouter);

app.use('/api', apiRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
