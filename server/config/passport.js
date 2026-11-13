import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = (
  process.env.BACKEND_URL ||
  process.env.SERVER_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error("❌ CRITICAL ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing in .env!");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email returned from Google"), null);
        }

        // 1. Existing Google User
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        // 2. Existing Email User
        user = await User.findOne({ email });
        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        // 3. Create New User
        const rawEmailPrefix = email.split("@")[0].toLowerCase();
        let cleanBaseName = rawEmailPrefix.replace(/[^a-z0-9]/g, "");

        if (cleanBaseName.length < 3) {
          cleanBaseName = `user${cleanBaseName}`;
        }

        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const username = `${cleanBaseName.slice(0, 15)}_${uniqueSuffix}`;

        user = await User.create({
          name: profile.displayName || cleanBaseName,
          username: username,
          email: email,
          googleId: profile.id,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;