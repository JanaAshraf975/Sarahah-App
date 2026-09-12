import dotenv from 'dotenv';
import {resolve} from "node:path";


const envPath={
    development:"dev.env",
    production:"prod.env",
}

dotenv.config({path:resolve(`./config/${envPath.development}`)});



export const PORT=process.env.PORT || 3000;


