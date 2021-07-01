import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv_defaults from "dotenv-defaults";
import loginRoute from "./routes/login.js";
import accountRoute from "./routes/account.js";
import noteRoutes from "./routes/note.js";
import account_noteRoute from "./routes/account_note.js";
import wakeUpDyno from "./route/wakeUpDyno.js";
import httpServer from "http-server";
import path from "path";
import { wakeDyno } from "heroku-keep-awake";

dotenv_defaults.config();

const app = express();
const port = process.env.PORT || 4000;
const DYNO_URL = "https://ntu-webprograming-project.herokuapp.com";

app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// should according to the url of axios in frontends

app.use("/note", noteRoutes);
app.use("/login", loginRoute);
app.use("/account", accountRoute);
app.use("/note", account_noteRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  wakeDyno(DYNO_URL);
  console.log(`App listening on port ${port}`);
});

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("Mongo DB connection created");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set("useFindAndModify", false);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
}
