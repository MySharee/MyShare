import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
// import { AppDataSource } from './database';

const PORT = Number(process.env.PORT) || 8000;

async function bootstrap() {
    try {
        // await AppDataSource.initialize();
        console.log('Database connection established.');

        const server = app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

        const shutdown = async (signal: string) => {
            console.log(`Received ${signal}. Shutting down gracefully...`);
            server.close(async () => {
                // if (AppDataSource.isInitialized) {
                //     await AppDataSource.destroy();
                // }
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
