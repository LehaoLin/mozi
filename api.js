import dayjs from "dayjs";
import { db_insert, db_find, db_remove } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { call_py } from "./pyfunc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const api_config = (app, db) => {
  app.get("/", async (req, res) => {
    let ctx = req.body;
    req.session.uid = "x";
    let now = dayjs().format();
    ctx.now = now;
    await call_py("/", { test: 1 });
    res.json(ctx);
  });

  //   for vue project inside
  //   app.use("/", express.static(path.join(__dirname, "frontend/dist")));

  app.post("/", async (req, res) => {
    let ctx = req.body;
    res.json(ctx);
  });

  return app;
};
