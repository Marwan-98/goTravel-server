import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logget";
import socket from "./socket";
import * as dotenv from "dotenv";

// const port = config.get<number>("port");
// const corsOrigin = config.get<string>("corsOrigin");

const app = express();
dotenv.config();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.get("/", (req, res) => res.sendStatus(200));

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening`);
  socket({ io });
});
