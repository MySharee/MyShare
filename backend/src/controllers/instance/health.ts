import { type Request, type Response } from 'express';

function format(uptime: number): string {
    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);

    const pad = (s: number): string => (s < 10 ? '0' : '') + s;
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

export function getHealth(_req: Request, _res: Response) {
    return _res.status(200).json({
        status: 'OK',
        uptime: format(process.uptime()),
        message: 'Api is healthy',
    });
}

export default getHealth;
