import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oidc";
import { Strategy as GitHubStrategy } from "passport-github2";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";
import { GraphQLContext } from "./context";
import { createTokens } from "./auth";

const SECRET = "sgrtyu6te657trghtrgh65uy7hbw56y6yhtgrset5455645y54";

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env["FACEBOOK_APP_ID"]!,
        clientSecret: process.env["FACEBOOK_APP_SECRET"]!,
        callbackURL: `${process.env["NGROK_BASEURL"]}/oauth2/redirect/facebook`,
        state: false,
      },
      async (accessToken, refreshToken, profile, cb) => {
        // 2 cases
        // #1 first time login
        // #2 other times
        const { id, displayName } = profile;
        let fbUser = await models.FbAuth.findOne({ where: { fb_id: id } });
        console.log(fbUser);
        console.log(profile);

        if (!fbUser) {
          const user = await models.User.create();
          fbUser = await models.FbAuth.create({
            fb_id: id,
            display_name: displayName,
            user_id: user.id,
          });
        }

        console.log(profile);
        cb(null, fbUser);
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"]!,
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
        callbackURL: "/oauth2/redirect/google",
      },
      (issuer, profile, cb) => {
        console.log(profile);
        cb(null, {});
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env["GITHUB_CLIENT_ID"]!,
        clientSecret: process.env["GITHUB_CLIENT_SECRET"]!,
        callbackURL: `${process.env["NGROK_BASEURL"]}/auth/github/callback`,
        state: false,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, {});
      }
    )
  );

  // app.use(passport.initialize());
  // Set up Apollo Server
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, { context: async ({ req, res }) => ({ models }) })
  );

  app.get("/", (req: any, res: any) => {
    res.send("hello world");
  });

  app.get("/login/facebook", passport.authenticate("facebook"));
  app.get("/login/google", passport.authenticate("google"));
  app.get("/login/github", passport.authenticate("github", { scope: [] }));

  app.get(
    "/oauth2/redirect/facebook",
    passport.authenticate("facebook", {
      /*failureRedirect: '/login', failureMessage: true*/ session: false,
    }),
    async (req, res) => {
      const [token, refreshToken] = await createTokens(req.user, SECRET);
      res.redirect(`http://192.168.0.8:8080/home?token=${token}&refreshToken=${refreshToken}`);
    }
  );

  app.get(
    "/oauth2/redirect/google",
    passport.authenticate("google", {
      /*successRedirect: "/",
    failureRedirect: "/login",*/
      session: false,
    }),
    function (req, res) {
      //    res.redirect('/');
      res.send("GOOGLE AUTH WAS GOOD!");
    }
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      /*failureRedirect: '/login'*/ session: false,
    }),
    function (req, res) {
      res.send("GITHUB AUTH WAS GOOD!");
    }
  );

  await models.sequelize.sync({ alter: true });

  await new Promise((resolve) =>
    httpServer.listen({ port: 3000 }, resolve as () => void)
  );

  console.log("listening on port 3000");
};

main();
