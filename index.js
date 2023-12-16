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
import { call_py } from "./pyfunc.js";

import { execSync, spawn } from "child_process";
import fileUpload from "express-fileupload";

import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

execSync("pnpm build");

const directoryPath = "./data";

// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
  // If it doesn't exist, create the directory
  fs.mkdirSync(directoryPath);
  console.log(chalk.blue(`${directoryPath} created successfully.`));
} else {
  console.log(chalk.blue(`${directoryPath} already exists.`));
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
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: `${__dirname}/tmp/`,
  })
);

// for session
import session from "express-session";
import FileStore from "session-file-store";
const FileStoreInstance = FileStore(session);
app.use(
  session({
    store: new FileStoreInstance(),
    secret: "mozi mozi mozi",
    resave: true,
    saveUninitialized: true,
    reapInterval: 60 * 60,
    ttl: 60 * 60 * 24,
    cookie: { maxAge: 60 * 60 * 24 * 365 },
  })
);

// db connect
const db = await db_connect("data");

// api config
app = api_config(app, db);
io = socket_config(io, db);

// connect to python
const child = spawn("python3 server.py", {
  stdio: "inherit",
  shell: true,
  cwd: `${__dirname}/pyscript`,
});

server.listen(port, () => {
  console.log(chalk.bold.blue(`Server is running on http://localhost:${port}`));
});
