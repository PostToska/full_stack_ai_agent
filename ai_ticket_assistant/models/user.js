import mongoose from "mongoose";

// define the scheme
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "user", enum: ["user", "moderator",
        "admin"]},
    skills: [String],
    createdAt: {type: Date, default: Date.now,},
});

// export a User model based on this schema
export default mongoose.model("User", userSchema);