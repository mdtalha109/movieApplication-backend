import express from "express";
import connectDB from "./config/db.js";
import 'dotenv/config';
import bodyparser from 'body-parser'
import cors from 'cors'

import userRoute from './routes/userRoute.js'
import listRoute from './routes/listRoute.js'

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
connectDB();

app.use('/api/user', userRoute)

app.use('/api/list', listRoute)

app.get('/', (req, res) => {
    res.end('hello from server')
})


const PORT = process.env.PORT || 5000
app.listen(PORT);



