import { NotImplementedError } from '../../utils/Error';
import { type Request, type Response } from 'express';

export function registerUser(_req: Request, _res: Response) {
    throw new NotImplementedError('Register functionality is not implemented yet.');
}

export default registerUser;
