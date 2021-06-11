import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use(router);

app.listen(port, () => console.log(`Server is listening on ${port}`));