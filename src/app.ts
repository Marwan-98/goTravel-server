import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logget";
import socket from "./socket";

const port = config.get<number>("port");
const host = config.get<number>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (req, res) => res.sendStatus(200));

httpServer.listen(port, host, () => {
  console.log(`Server is listening`);
  socket({ io });
});
