import { Pool } from "pg";

const connectionConfiguration = {
   user: process.env.JTJ_DB_USERNAME,
   host: process.env.JTJ_DB_URL,
   database: process.env.JTJ_DB_NAME || 'postgres',
   password: process.env.JTJ_DB_PASSWORD,
   port: +process.env.JTJ_DB_PORT || 5432,
   max: 5
};

// console.log(connectionConfiguration);

export const connectionPool = new Pool(connectionConfiguration);