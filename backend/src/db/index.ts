import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

dotenv.config();

export const poolConnection = createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME || 'mariadb',
    password: process.env.DB_PASSWORD || 'MakeASecurePassword999!',
    database: process.env.DATABASE || 'myshare',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });

export type Database = typeof db;

export * from './schema';
