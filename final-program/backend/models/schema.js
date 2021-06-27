const mongoose = require('mongoose')

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: { type: String, require: true },
  grade: { type: String, require: true },
  subject: { type: String, require: true },
  // 連結到會員資料
  author: { type: mongoose.Types.ObjectId},
  rate: { type: Number, require: true },
  price: { type: Number, require: true },
  hassold: { type: Boolean, require: true },
  //img: { type: [String] },
  img: { type: String },
  description: { type: String, require: true },
  pdffile:{type:String, require:true},
  pdffile_preview:{type: String,},
});


const noteModel = mongoose.model('Note', noteSchema);
export default noteModel