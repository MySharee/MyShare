import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { poolConnection } from './db/index';

const PORT = Number(process.env.PORT) || 8000;

async function bootstrap() {
    try {
        // Validate connection before accepting traffic
        const conn = await poolConnection.getConnection();
        conn.release();
        console.log('Database connection pool established.');

        const server = app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

        const shutdown = async (signal: string) => {
            console.log(`Received ${signal}. Shutting down gracefully...`);
            server.close(async () => {
                await poolConnection.end();
                console.log('Database pool drained.');
                process.exit(0);
            });
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

bootstrap();
