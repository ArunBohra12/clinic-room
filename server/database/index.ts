import { Client } from 'pg';

const db = new Client({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
});

db.connect();

export default db;
