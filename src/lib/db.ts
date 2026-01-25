import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema";
import 'dotenv/config';
import "server-only";
const connectionString = process.env.DATABASE_URL!;

// Prevent multiple pools in development
const globalForDb = global as unknown as { pool: mysql.Pool | undefined };

const poolConnection = globalForDb.pool ?? mysql.createPool({
  uri: connectionString,
  connectionLimit: 1, // Be very conservative with free tier connections
  maxIdle: 1,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

if (process.env.NODE_ENV !== "production") globalForDb.pool = poolConnection;

export const db = drizzle(poolConnection, { schema, mode: 'default' });
