import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import connectDB from "./backend/config/connect.mjs";
import cors from "cors";
import passport from "passport";
import authRoutes from "./backend/auth/auth-routes.mjs";
import newsRoutes from "./backend/controllers/news.mjs";
import "./backend/auth/google-strategy.mjs";

dotenv.config();

const app = express();

import session from "express-session";
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

start();

app.use("/api/auth", authRoutes);
app.use("/api", newsRoutes);

app.get(
    "/auth/google/redirect",
    passport.authenticate("google", {
        failureRedirect: "/login",
        successRedirect: "/dashboard",
    }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);
app.get("/", (req, res) => {
    res.send("Hello World");
});
