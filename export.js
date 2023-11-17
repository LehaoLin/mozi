import fs from "fs/promises";

import { db_connect } from "./db.js";

export const db_export = async (db, name) => {
  const docs = await db.findAsync({});
  await fs.writeFile(`./data/${name}.json`, docs);
  console.log(`DB ${name}.db exported to json`);
};

(async () => {
  let name = "data";
  let db = db_connect(name);
  await db_export(db, name);
})();
