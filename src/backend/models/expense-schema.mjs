import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide the expense name"],
            trim: true,
            minlength: [2, "Expense name must be at least 2 characters"],
        },
        amount: {
            type: Number,
            required: [true, "Please provide the expense amount"],
            min: [0, "Amount must be greater than 0"],
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        date: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference the User model
            required: true,
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
