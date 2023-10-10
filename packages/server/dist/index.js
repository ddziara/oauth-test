"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const passport_google_oidc_1 = require("passport-google-oidc");
const passport_github2_1 = require("passport-github2");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const models_1 = __importDefault(require("./models"));
const auth_1 = require("./auth");
const SECRET = "sgrtyu6te657trghtrgh65uy7hbw56y6yhtgrset5455645y54";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: process.env["FACEBOOK_APP_ID"],
        clientSecret: process.env["FACEBOOK_APP_SECRET"],
        callbackURL: `${process.env["NGROK_BASEURL"]}/oauth2/redirect/facebook`,
        state: false,
    }, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
        // 2 cases
        // #1 first time login
        // #2 other times
        const { id, displayName } = profile;
        let fbUser = yield models_1.default.FbAuth.findOne({ where: { fb_id: id } });
        console.log(fbUser);
        console.log(profile);
        if (!fbUser) {
            const user = yield models_1.default.User.create();
            fbUser = yield models_1.default.FbAuth.create({
                fb_id: id,
                display_name: displayName,
                user_id: user.id,
            });
        }
        console.log(profile);
        cb(null, fbUser);
    })));
    passport_1.default.use(new passport_google_oidc_1.Strategy({
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/oauth2/redirect/google",
    }, (issuer, profile, cb) => {
        console.log(profile);
        cb(null, {});
    }));
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: process.env["GITHUB_CLIENT_ID"],
        clientSecret: process.env["GITHUB_CLIENT_SECRET"],
        callbackURL: `${process.env["NGROK_BASEURL"]}/auth/github/callback`,
        state: false,
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, {});
    }));
    // app.use(passport.initialize());
    // Set up Apollo Server
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    yield server.start();
    app.use("/graphql", (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, { context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () { return ({ models: models_1.default }); }) }));
    app.get("/", (req, res) => {
        res.send("hello world");
    });
    app.get("/login/facebook", passport_1.default.authenticate("facebook"));
    app.get("/login/google", passport_1.default.authenticate("google"));
    app.get("/login/github", passport_1.default.authenticate("github", { scope: [] }));
    app.get("/oauth2/redirect/facebook", passport_1.default.authenticate("facebook", {
        /*failureRedirect: '/login', failureMessage: true*/ session: false,
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const [token, refreshToken] = yield (0, auth_1.createTokens)(req.user, SECRET);
        res.redirect(`http://192.168.0.8:8080/home?token=${token}&refreshToken=${refreshToken}`);
    }));
    app.get("/oauth2/redirect/google", passport_1.default.authenticate("google", {
        /*successRedirect: "/",
      failureRedirect: "/login",*/
        session: false,
    }), function (req, res) {
        //    res.redirect('/');
        res.send("GOOGLE AUTH WAS GOOD!");
    });
    app.get("/auth/github/callback", passport_1.default.authenticate("github", {
        /*failureRedirect: '/login'*/ session: false,
    }), function (req, res) {
        res.send("GITHUB AUTH WAS GOOD!");
    });
    yield models_1.default.sequelize.sync({ alter: true });
    yield new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
    console.log("listening on port 3000");
});
main();
//# sourceMappingURL=index.js.map