import { NotImplementedError } from '../../utils/Error';
import { type Request, type Response } from 'express';

export function getVersion(_req: Request, _res: Response) {
    throw new NotImplementedError('Version retrieval is not implemented yet.');
}

export default getVersion;
