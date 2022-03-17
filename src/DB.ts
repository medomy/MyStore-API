import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

let client : Pool = new Pool({
    host : process.env.POSTGRES_HOST?.toString(),
    user : process.env.POSTGRES_USER?.toString(),
    password : process.env.POSTGRES_PASSWORD?.toString(),
    database : process.env.POSTGRES_DB?.toString()
})

export default client;