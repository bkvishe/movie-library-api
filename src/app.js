import express from "express";
import serverless from "serverless-http";

import apiRoutes from './routes/index.js';
import { responseToJson } from './middlewares/response.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(responseToJson);
app.use('/api/v1', apiRoutes);
app.use(errorHandler);

// Export the app for testing
export const server = app;

export const handler = serverless(app);
