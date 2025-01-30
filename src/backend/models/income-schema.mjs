import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["salary", "business", "investment", "freelance", "other"],
            trim: true,
            lowercase: true,
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0, "Amount must be non-negative"],
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        month: {
            type: String,
            required: [true, "Month is required"],
            enum: [
                "january",
                "february",
                "march",
                "april",
                "may",
                "june",
                "july",
                "august",
                "september",
                "october",
                "november",
                "december",
            ],
            trim: true,
            lowercase: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
