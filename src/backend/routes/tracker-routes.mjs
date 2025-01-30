import express from "express";
const router = express.Router();
import Expense from "../models/expenseSchema.mjs";
import { resolveByIndex } from "../utils/mdware.mjs";
router.get("/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/expenses/get/:id", resolveByIndex, async (req, res) => {
    const { id } = req.params;
    const expense = Expense.findById(id);
    res.json(expense);
});

router.post("/expenses/add", (req, res) => {
    res.send("Expense added");
});
router.put("/expenses/update/:id", (req, res) => {
    res.send("Expense updated");
});
router.delete("/expenses/delete/:id", (req, res) => {
    res.send("Expense deleted");
});

export default router;
