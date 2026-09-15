import { NotImplementedError } from "../../utils/Error";
import { type Request, type Response } from "express";

export function getNoteById(_req: Request, _res: Response) {
    throw new NotImplementedError('Fetching individual notes is not implemented yet.');
}

export default getNoteById;
