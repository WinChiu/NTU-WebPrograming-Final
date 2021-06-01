import mongoose from "mongoose"

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    grade: String,
    subject: String,
    author: String,
    rate: Number,
    price: Number,
    hassold: Number,
    img : String,
    description:String,
    }
);

const NoteSchema = mongoose.model('note', NoteSchema);

export default ScoreCard;
//export default model('ScoreCard', ScoreCardSchema);