import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv_defaults from "dotenv-defaults";
import loginRoute from "./routes/login.js";
import accountRoute from "./routes/account.js";
import noteRoutes from "./routes/note.js";
import account_noteRoute from "./routes/account_note.js";
import path from "path";

dotenv_defaults.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// should according to the url of axios in frontends
// app.use("/note/upload", noteRoutes);
app.use("/note", noteRoutes);
app.use("/login", loginRoute);
app.use("/account", accountRoute);
app.use("/note", account_noteRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
// mongoose
//   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((res) => {
//     console.log("Mongo DB connection created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// mongoose.set("useFindAndModify", false);

mongoose
  .connect(
    "mongodb+srv://evan:evan145236@webprogramming.srmi9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    console.log("Mongo DB connection created");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set("useFindAndModify", false);

//import mongo from './mongo';
// import express from 'express';
// import cors from 'cors';

// gotta load in MONGO_URL before `mongo.connect()`

//mongo.connect();

// const server = app.listen(process.env.PORT || 4000, function () {
//   console.log('Listening on port ' + server.address().port);
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));

  // // Hande SPA
  // app.use(/.*/, (req, res) => {
  //   res.sendFile("../public");
  // }); // Refer to any route at all
}
