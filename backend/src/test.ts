import { z } from 'zod';

export const ConfigSchema = z.object({
    useConfigFile: z.boolean().default(false),
    server: z.object({
        port: z.number().int().min(1).max(65535),
        host: z.string().min(1),
    }),
    app: z.object({
        logLevel: z.enum(['debug', 'info', 'warn', 'error']),
        rateLimitMax: z.number().int().positive(),
    }),
});

export type AppConfig = z.infer<typeof ConfigSchema>;

export const DEFAULT_CONFIG: AppConfig = {
    useConfigFile: false,
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    app: {
        logLevel: 'info',
        rateLimitMax: 100,
    },
};
