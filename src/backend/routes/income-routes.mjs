import express from "express";
const router = express.Router();
import Income from "../models/incomeSchema.mjs";
import { resolveByIndex } from "../utils/middleware.mjs";

router.get("/income", async (req, res) => {
    try {
        const income = await Income.find();
        res.json(income);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/income/get/:id", resolveByIndex, async (req, res) => {
    try {
        const { id } = req.params;
        const income = Income.findById(id);
        res.json(income);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/income/add", async (req, res) => {
    try {
        const income = new Income(req.body);
        await income.save();
        res.json(income);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/income/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(income);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/income/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Income.findByIdAndDelete(id);
        res.json({ message: "Income deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
