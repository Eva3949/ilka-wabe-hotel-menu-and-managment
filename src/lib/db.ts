import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;

// For XAMPP MySQL, sometimes we need to be explicit with the connection config
// especially if the URL parsing has issues with empty passwords
const poolConnection = mysql.createPool(connectionString);

export const db = drizzle(poolConnection, { schema, mode: 'default' });
