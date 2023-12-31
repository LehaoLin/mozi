import Datastore from "@seald-io/nedb";
import fs from "fs/promises";
import chalk from "chalk";

const check_create = async (name) => {
  let filePath = `./data/${name}.db`;
  try {
    await fs.access(filePath, fs.constants.F_OK);
    console.log(chalk.blue(`${name}.db file exists`));
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

// sort {key: -1}
export const db_find = async (db, data, sort = {}) => {
  if (Object.keys(sort).length == 0) {
    const docs = await db.findAsync(data);
    return docs;
  } else {
    const docs = await db.findAsync(data).sort(sort);
    return docs;
  }
};

export const db_remove = async (db, data) => {
  try {
    await db.removeAsync(data, { multi: true });
  } catch (err) {
    console.log(err);
  }
};
