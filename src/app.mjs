import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import connectDB from "./backend/config/connect.mjs";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo"; // Store sessions in MongoDB
import authRoutes from "./backend/auth/auth-routes.mjs";
import newsRoutes from "./backend/controllers/news.mjs";
import "./backend/auth/google-strategy.mjs";

dotenv.config();

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI, // Your MongoDB connection string
            collectionName: "sessions",
        }),
        cookie: { secure: false, httpOnly: true }, // Secure should be true in production with HTTPS
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

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

// app.get(
//     "/auth/google/redirect",
//     passport.authenticate("google", {
//         failureRedirect: "/login",
//         successRedirect: "/dashboard",
//     }),
//     (req, res) => {
//         res.redirect("/dashboard");
//     }
// );
// app.get(
//     "/auth/google/redirect",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//         // Send the authenticated user to the frontend
//         res.redirect(`http://localhost:3000/dashboard`);
//     }
// );
// app.get(
//     "/auth/google/redirect",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//         if (!req.user) {
//             return res.redirect("http://localhost:3000/login");
//         }

//         // Send user data to frontend
//         res.redirect(
//             `http://localhost:3000/dashboard?user=${encodeURIComponent(
//                 JSON.stringify(req.user)
//             )}`
//         );
//     }
// );


app.get("/", (req, res) => {
    res.send("Hello World");
});
