
import express from 'express';
import {PORT} from './config/config.service.js';
import {bootstrap} from './src/app.controller.js';

const app=express();
bootstrap(app,express);
const port=PORT;

app.listen(port,()=>{
     console.log(`Server is running on http://localhost:${port}`);
})

