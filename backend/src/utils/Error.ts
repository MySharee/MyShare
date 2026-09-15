export abstract class AppError extends Error {
    public abstract readonly statusCode: number;
    public readonly isOperational: boolean = true;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    public readonly statusCode = 400;
}

export class UnauthorizedError extends AppError {
    public readonly statusCode = 401;
}

export class ForbiddenError extends AppError {
    public readonly statusCode = 403;
}

export class NotFoundError extends AppError {
    public readonly statusCode = 404;
}

export class ConflictError extends AppError {
    public readonly statusCode = 409;
}

export class NotImplementedError extends AppError {
    public readonly statusCode = 501;
}
