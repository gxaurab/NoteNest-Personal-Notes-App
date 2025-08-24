import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role:     { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
export default User;
