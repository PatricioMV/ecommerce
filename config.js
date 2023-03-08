import dotenv  from 'dotenv';
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_PASS = process.env.GMAIL_PASS;