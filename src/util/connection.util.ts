import { Pool } from "pg";

const connectionConfiguration = {
   user: process.env.JTJ_DB_USERNAME || 'postgres',
   host: process.env.JTJ_DB_URL || 'jtojohnson.cbecxpd79kth.us-east-1.rds.amazonaws.com',
   database: process.env.JTJ_DB_NAME || 'postgres',
   password: process.env.JTJ_DB_PASSWORD || 'febfour95',
   port: +process.env.JTJ_DB_PORT || 5432,
   max: 5
};

// console.log(connectionConfiguration);

export const connectionPool = new Pool(connectionConfiguration);
