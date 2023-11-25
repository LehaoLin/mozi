import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import fs from "fs";

import { Server } from "socket.io";
import { createServer } from "node:http";

import { db_connect, db_insert, db_find, db_remove } from "./db.js";

import cookieParser from "cookie-parser";

import getPort, { portNumbers } from "get-port";

import { api_config } from "./api.js";
import { socket_config } from "./api_socket.js";

const directoryPath = "./data";

// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
  // If it doesn't exist, create the directory
  fs.mkdirSync(directoryPath);
  console.log(`${directoryPath} created successfully.`);
} else {
  console.log(`${directoryPath} already exists.`);
}

let app = express();
const server = createServer(app);

const port = await getPort({ port: portNumbers(5555, 5600) });
const allowOrigin = ["http://localhost:5173", `http://localhost:${port}`];

const corsOptions = {
  origin: allowOrigin,
  credentials: true,
};

let io = new Server(server, {
  cors: {
    origin: allowOrigin,
  },
});

app.use(cors(corsOptions));
app.use(express.json());
app.use("/static", express.static("./public"));
app.use(cookieParser());

import session from "express-session";
import FileStore from "session-file-store";
const FileStoreInstance = FileStore(session);

app.use(
  session({
    store: new FileStoreInstance(),
    secret: "mozi mozi mozi",
    resave: true,
    saveUninitialized: true,
    reapInterval: -1,
    ttl: 60 * 60 * 24,
    cookie: { maxAge: 60 * 60 * 24 * 365 },
  })
);

const db = await db_connect("data");

app = api_config(app, db);
io = socket_config(io, db);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
