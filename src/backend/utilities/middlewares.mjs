import mongoose from "mongoose";

const resolveByIndex = (model) => async (req, res, next) => {
    const { id } = req.params;
    const item = await model.findById(id);
    if (!item) {
        return res.status(404).json({ error: `${model.modelName} not found` });
    }
    req.item = item;
    next();
};

// middleware to handle errors
const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export { resolveByIndex, handleErrors };
