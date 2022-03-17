import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import productsHandler from './handlers/productshandler';
import categoriesHandler from './handlers/categoriesHandler';
import usersHandler from './handlers/usersHandler';
import ordersHandler from './handlers/ordersHandler';
import commentsHandler from './handlers/commentsHandler';

const app : express.Application = express();
const port : number = 4500;
const address : string = `http://localhost:${port}`;

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use([cors(corsOptions) , bodyParser.json()]);

app.get('/' , (req : express.Request , res : express.Response)=>{
    res.send("go to /");
})

productsHandler(app);
categoriesHandler(app);
usersHandler(app);
ordersHandler(app);
commentsHandler(app);
app.listen(port,()=>{
    console.log(`server opened at ${address}`);
})
