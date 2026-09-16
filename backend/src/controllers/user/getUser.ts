import { NotImplementedError } from '../../utils/Error';
import { type Request, type Response } from 'express';

export function getUser(req: Request, _res: Response) {
    if (req.params.id === 'me')
        throw new NotImplementedError('Retrieving the current user is not implemented yet.');
    else throw new NotImplementedError('Getting users is not implemented yet.');
}

export default getUser;
