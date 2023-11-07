import Datastore from "@seald-io/nedb";
import fs from "fs/promises";

const check_create = async (name) => {
  let filePath = `./data/${name}.db`;
  try {
    await fs.access(filePath, fs.constants.F_OK);
    console.log(`${name}.db file exists`);
  } catch {
    await fs.writeFile(filePath, "");
  }
};

export const db_connect = async (name) => {
  await check_create(name);
  const db = new Datastore({ filename: `./data/${name}.db`, autoload: true });
  return db;
};

export const db_insert = async (db, data) => {
  try {
    const newDoc = await db.insertAsync(data);
  } catch (err) {
    console.log(err);
  }
};

export const db_find = async (db, data) => {
  const docs = await db.findAsync(data);
  return docs;
};

export const db_remove = async (db, data) => {
  try {
    await db.removeAsync(data, { multi: true });
  } catch (err) {
    console.log(err);
  }
};
