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

//API for develop testing

router.post("/creative_activity_testing", async (req, res) => {
  const { title, status, time, location, description, name } = req.query;
  let newActivity = new ActivityModel({ title, status, time, location, description });
  const member = await MemberModel.findOne({ name: name });
  member.attendActivity.push(newActivity);
  member.save();
  newActivity.save();
});
router.post("/creative_reservation_testing", async (req, res) => {
  const { title, student, mentor, date, location, status } = req.query;
  const studentId = await MemberModel.findOne({ name: student });
  const mentorId = await MemberModel.findOne({ name: mentor });
  let newReservation = new ReservationModel({ title, date, location, status, student: studentId, mentor: mentorId });
  mentorId.reservation.push(newReservation);
  mentorId.save();
  studentId.reservation.push(newReservation);
  studentId.save();
  newReservation.save();
});
router.post("/adddActivity", async (req, res) => {
  const { title, name } = req.query;
  const activity = await ActivityModel.findOne({ title: title });
  const member = await MemberModel.findOne({ name: name });
  member.attendActivity.push(activity);
  member.save();
});

export default router;
