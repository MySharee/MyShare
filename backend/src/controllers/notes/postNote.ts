import { NotImplementedError } from "../../utils/Error";
import { type Request, type Response } from "express";

export function postNote(_req: Request, _res: Response) {
    throw new NotImplementedError('Posting notes is not implemented yet.');
}

export default postNote;
