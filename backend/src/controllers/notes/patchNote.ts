import { NotImplementedError } from '../../utils/Error';
import { type Request, type Response } from 'express';

export function patchNote(_req: Request, _res: Response) {
    throw new NotImplementedError('Editing notes is not implemented yet.');
}

export default patchNote;
