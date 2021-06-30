import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  memberType: { type: String, require: true }, //mentor student
  ownNote: { type: [mongoose.Types.ObjectId], ref: "Note" },
  noteBuy: { type: [mongoose.Types.ObjectId], ref: "Note" },
  selfIntro: { type: String },
  attendActivity: { type: [mongoose.Types.ObjectId], ref: "Activity" },
  money: { type: Number, require: true },
  reservation: { type: [mongoose.Types.ObjectId], ref: "Reservation" },
});

const reservationSchema = new Schema({
  title: { type: String, require: true },
  student: { type: mongoose.Types.ObjectId, ref: "Member" },
  mentor: { type: mongoose.Types.ObjectId, ref: "Member" },
  date: { type: Date, require: true },
  location: { type: String, require: true },
  status: { type: String, require: true },
});

const noteSchema = new Schema({
  title: { type: String, require: true },
  grade: { type: String, require: true },
  subject: { type: String, require: true },
  author: { type: mongoose.Types.ObjectId, ref: "Member" },
  rate: { type: Number, require: true },
  price: { type: Number, require: true },
  // isSold 
  hassold: { type: Number, require: true },
  // imgUrl: { type: [String] },
  img: { type: String },
  description: { type: String, require: true },
  pdffile: { type: String, require: true },
  pdffile_preview: { type: String },
});

const activitySchema = new Schema({
  title: { type: String, require: true },
  status: { type: String, require: true },
  time: { type: Date, require: true },
  location: { type: String, require: true },
  description: { type: String },
});

export const MemberModel = mongoose.model("Member", memberSchema);
export const ReservationModel = mongoose.model("Reservation", reservationSchema);
export const noteModel = mongoose.model("Note", noteSchema);
export const ActivityModel = mongoose.model("Activity", activitySchema);
