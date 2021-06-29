import mongoose from "mongoose";
import express from "express";
import { MemberModel } from "../models/schema.js";
import { noteModel } from "../models/schema.js";
const router = express.Router();

router.post("/login_account", async (req, res) => {
  const { name, password, memberType } = req.query;
  const isAccountExist = await MemberModel.findOne({ name: name, memberType: memberType });
  if (!isAccountExist) {
    res.send({ msg: "Account not exist" });
  } else if (isAccountExist.password !== password) {
    res.send({ msg: "Password error" });
  } else {
    res.send({ msg: "Login success" });
  }
});

router.post("/register", async (req, res) => {
  const { name, password, memberType, email, money } = req.query;

  const isAccountExist = await MemberModel.findOne({ $or: [{ email: email }, { name: name }] });
  console.log(isAccountExist);
  if (isAccountExist) {
    res.send({ msg: "Account exist" });
  } else {
    try {
      const newMember = new MemberModel({ name, email, password, memberType, money });
      console.log(isAccountExist);
      res.send({ msg: "Member creation success" });
      return newMember.save();
    } catch (err) {
      res.status(400).send({ msg: "Member creation error: " + err });
    }
  }
});

export default router;
