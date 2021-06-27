import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv_defaults from "dotenv-defaults";
import loginRoute from "./routes/login.js";
import accountRoute from "./routes/account.js";
import uploadnoteRoutes from "./routes/note";

dotenv_defaults.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/note/upload", uploadnoteRoutes);
app.use("/login", loginRoute);
app.use("/account", accountRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
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

// import mongo from './mongo';
// import express from 'express';
// import cors from 'cors';
//import routes from './routes';

// gotta load in MONGO_URL before `mongo.connect()`

//app.use('/', routes);

// mongo.connect();

// const server = app.listen(process.env.PORT || 4000, function () {
//   console.log('Listening on port ' + server.address().port);
// });
