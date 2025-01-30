import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import { GoogleUser } from "../models/google-user-schema.mjs";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !CALLBACK_URL) {
    console.error("Missing Google OAuth configuration. Check your .env file.");
    throw new Error("Google OAuth configuration is missing.");
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await GoogleUser.findById(id);
        done(null, user);
    } catch (err) {
        console.error("Error deserializing user:", err);
        done(err);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await GoogleUser.findOne({
                    googleId: profile.id,
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new GoogleUser({
                    username: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : null,
                    googleId: profile.id,
                });

                const savedUser = await newUser.save();

                return done(null, savedUser);
            } catch (error) {
                console.error("Error in Google Strategy:", error);
                done(error);
            }
        }
    )
);

export default passport;
