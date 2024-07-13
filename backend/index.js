
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 

import templateRoutes from './routes/templateRoute.js';
import blockRoutes from './routes/blockRoute.js';
import keysRoutes from './routes/keysRoute.js';

import printName from "./helpers/printName.js";

const app = express();
const PORT = process.env.PORT || 8080; 

dotenv.config();

app.use(express.json());
app.use(cookieParser()); // middleware
app.use(cors({ origin: '*' }));

app.use('/api/template', templateRoutes);
app.use('/api/block', blockRoutes);
app.use('/api/keys', keysRoutes);

app.listen(PORT, () => {
	printName();
	console.log(`Welcome to Constructor server, port ${PORT} ✅✅✅`);
});
