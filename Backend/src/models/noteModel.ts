import { model, Schema } from "mongoose";
import { ref } from "process";

const noteSchema = new Schema({
    title: { type: String, required: true },
    tags: [String],
    body: { type: String, required: true },
    favourite: { type: Boolean, default: false }, 
    category: { type: String },

    userId: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, { timestamps: true })

const Note = model("Note", noteSchema)
export default Note;
