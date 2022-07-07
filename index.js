import express from "express";
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import { dbConnection } from "./database/config.js";
import cors from 'cors';

dotenv.config();

const app = express();

dbConnection();
app.use(cors())

app.use(express.json());

app.use(express.static('public'));

app.use('/api/auth', authRouter)


app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`)
})