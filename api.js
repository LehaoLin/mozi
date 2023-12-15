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
    console.log(now);
    await call_py("/", { test: 1 });
    res.json(ctx);
  });

  //   for vue project inside
  //   app.use("/", express.static(path.join(__dirname, "frontend/dist")));

  app.post("/", async (req, res) => {
    let ctx = req.body;
    res.json(ctx);
  });

  app.post("/upload", function (req, res) {
    // <form
    //   ref="uploadForm"
    //   id="uploadForm"
    //   action="http://localhost:8000/upload"
    //   method="post"
    //   encType="multipart/form-data"
    // >
    //   <input type="file" name="sampleFile" />
    //   <input type="submit" value="Upload!" />
    // </form>;
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + "/upload/" + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
    });
  });

  return app;
};
