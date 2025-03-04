import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";

export const passsportConfig = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/auth/github/callback",
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: Function
      ) => {
        const user = {
          ...profile,
          accessToken,
        };

        // console.log("User:", user);

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user: any, done: Function) => {
    console.log("User session:", user);
    done(null, user);
    passport.deserializeUser((obj: any, done: Function) => {
      console.log("Desserializando o usuário:", obj);
      done(null, obj);
    });
  });
};
