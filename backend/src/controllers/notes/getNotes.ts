import { NotImplementedError } from '../../utils/Error';
import { type Request, type Response } from 'express';

export function getNotes(req: Request, _res: Response) {
    // Could be cleaner. Possible ground for some api pathing changes?
    if (req.path.split('/').at(-1) === 'me')
        throw new NotImplementedError('Fetching user notes is not implemented yet.');
    else throw new NotImplementedError('Fetching instance notes is not implemented yet.');
}

export default getNotes;
