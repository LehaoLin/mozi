import dayjs from "dayjs";

export const api_config = (app, db) => {
  app.get("/", async (req, res) => {
    let ctx = req.body;
    req.session.uid = "x";
    let now = dayjs().format();
    ctx.now = now;
    return res.json(ctx);
  });

  app.post("/", async (req, res) => {
    let ctx = req.body;
    return res.json(ctx);
  });

  return app;
};
