import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config(); // TODO: load config.toml

export default defineConfig({
    dialect: 'mysql',
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dbCredentials: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USERNAME || 'mariadb',
        password: process.env.DB_PASSWORD || 'MakeASecurePassword999!',
        database: process.env.DATABASE || 'myshare',
    },
});
