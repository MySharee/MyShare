import { NotImplementedError } from "../../utils/Error";
import { type Request, type Response } from "express";

export function loginUser(_req: Request, _res: Response) {
    throw new NotImplementedError('Login functionality is not implemented yet.');
}

export default loginUser;
