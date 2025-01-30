import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        googleId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,

            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please provide a valid email",
            ],
        },
    },
    { timestamps: true }
);

export const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);
