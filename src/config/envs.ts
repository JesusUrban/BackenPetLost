import "dotenv/config";


import {get} from "env-var"

export const envs ={
    JWT_KEY: get("JWT_KEY").required().asString(),
    JWT_KEY_IN: get("JWT_KEY_IN").required().asString(),
    
    // For the cookies
    NODE_ENV: get('NODE_ENV').required().asString(),
    
    
    PORT: get("PORT").required().asPortNumber(),
    
DATABASE_USERNAME: get("DATABASE_USERNAME").required().asString(),
DATABASE_PASSWORD: get("DATABASE_PASSWORD").required().asString(),
DATABASE_HOST: get("DATABASE_HOST").required().asString(),
DATABASE_PORT: get("DATABASE_PORT").required().asPortNumber(),
DATABASE_NAME: get("DATABASE_NAME").required().asString(),

};