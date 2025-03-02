// auth.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

// GitHub Credentials
const GITHUB_CLIENT_ID = "Ov23liGdUTbfbmuUxxNQ";
const GITHUB_CLIENT_SECRET = "6e1d2343f416ff0a5e47ec87a1c9d19c2a4ac27e";
const GITHUB_CALLBACK_URL = "http://localhost:3000/auth/github/callback";

// Type Definitions
export interface GitHubProfile {
  id: string;
  displayName: string;
  username: string;
  emails: { value: string }[];
  photos: { value: string }[];
}

export interface User {
  profile: GitHubProfile;
  accessToken: string;
}

// Function to configure Passport
export const initAuth = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("🔹 GitHub strategy invoked!");
        if (!accessToken) {
          console.error("❌ ERROR: No access token received!");
          return done(new Error("Token not received"), null);
        }

        const user: User = { profile, accessToken };
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user: User, done) => {
    console.log("✅ Serializing user:", user.profile.username);
    done(null, user);
  });

  passport.deserializeUser((user: User, done) => {
    console.log("✅ Deserializing user:", user.profile.username);
    done(null, user);
  });
};
