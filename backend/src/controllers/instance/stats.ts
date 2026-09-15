import { NotImplementedError } from '../../utils/Error';
import { type Request, type Response } from 'express';

export function getInstanceStats(_req: Request, _res: Response) {
    throw new NotImplementedError('Getting instance stats is not implemented yet.');
}

export default getInstanceStats;
