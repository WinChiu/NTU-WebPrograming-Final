import mongoose from "mongoose";
import express from "express";
import { MemberModel } from "../models/schema.js";
import { ActivityModel, ReservationModel } from "../models/schema.js";
const router = express.Router();

router.get("/memberData/:name", async (req, res) => {
  let loginMember = await MemberModel.findOne({ name: req.params.name });
  loginMember = await loginMember
    .populate("ownNote")
    .populate("noteBuy")
    .populate("attendActivity")
    .populate({ path: "reservation", populate: "mentor" })
    .execPopulate();

  res.send({ memberData: loginMember });
});

export default router;
