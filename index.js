import express from "express";
import cors from "cors";
import dayjs from "dayjs";

import { db_connect, db_insert, db_find, db_remove } from "./db.js";

import cookieParser from "cookie-parser";

const app = express();

const allowOrigin = [];

const corsOptions = {
  origin: allowOrigin,
  credentials: true,
};

app.use(cors(corsOptions));
const port = 5555;
app.use(express.json());
app.use("/static", express.static("public"));
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
    cookie: { maxAge: 60 * 60 * 24 * 365 },
  })
);

let db;
(async () => {
  db = await db_connect("data");
})();

app.get("/", async (req, res) => {
  let ctx = req.body;
  let now = dayjs().format();
  ctx.now = now;
  return res.json(ctx);
});

app.post("/", async (req, res) => {
  let ctx = req.body;
  return res.json(ctx);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
