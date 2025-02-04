import express from "express";
import { User } from "../models/user-schema.mjs";

import {
    hashPassword,
    comparePassword,
} from "../utilities/password-utilities.mjs";
import passport from "passport";
import { GoogleUser } from "../models/google-user-schema.mjs";
import { body, validationResult } from "express-validator"; //for validation

import { handleErrors } from "../utilities/middlewares.mjs";
import {
    registerValidationRules,
    loginValidationRules,
} from "../utilities/validation-rules.mjs";

const router = express.Router();
router.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});

router.post(
    "/register",
    registerValidationRules,
    handleErrors,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await User.create({
                ...req.body,
                password: await hashPassword(req.body.password),
            });

            const { password, ...userWithoutPassword } = user.toObject();
            res.status(201).json(userWithoutPassword);
        } catch (err) {
            console.error("Registration error:", err);

            if (
                err.code === 11000 &&
                err.keyPattern &&
                err.keyPattern.email === 1
            ) {
                return res.status(400).json({ error: "Email already exists" });
            }
            if (
                err.code === 11000 &&
                err.keyPattern &&
                err.keyPattern.phone === 1
            ) {
                return res
                    .status(400)
                    .json({ error: "Phone number already exists" });
            }

            res.status(500).json({ error: "Failed to create user" });
        }
    }
);

router.post("/login", loginValidationRules, handleErrors, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json(userWithoutPassword);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

// Google OAuth routes (no changes needed here)
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Add this route to handle the Google OAuth redirect
router.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        if (!req.user) {
            return res.redirect("http://localhost:3000/login");
        }

        // Send user data to frontend
        res.redirect(
            `http://localhost:3000/dashboard?user=${encodeURIComponent(
                JSON.stringify(req.user)
            )}`
        );
    }
);

export default router;
