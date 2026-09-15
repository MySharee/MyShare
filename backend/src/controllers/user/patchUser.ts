import { NotImplementedError } from "../../utils/Error";
import { type Request, type Response } from "express";

export function patchUser(req: Request, _res: Response) {
    if (req.params.id === "me") throw new NotImplementedError('Editing user settings is not implemented yet.');
    else throw new NotImplementedError('Managing users is not implemented yet.');
}

export default patchUser;
