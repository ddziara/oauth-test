"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env["FACEBOOK_APP_ID"],
    clientSecret: process.env["FACEBOOK_APP_SECRET"],
    callbackURL: "https://4fe4-89-64-48-216.ngrok-free.app/oauth2/redirect/facebook",
    state: false,
}, function verify(accessToken, refreshToken, profile, cb) {
    console.log("BUBU");
    // db.get(
    //   "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
    //   ["https://www.facebook.com", profile.id],
    //   function (err, cred) {
    //     if (err) {
    //       return cb(err);
    //     }
    //     if (!cred) {
    //       // The account at Facebook has not logged in to this app before.  Create
    //       // a new user record and associate it with the Facebook account.
    //       db.run(
    //         "INSERT INTO users (name) VALUES (?)",
    //         [profile.displayName],
    //         function (err) {
    //           if (err) {
    //             return cb(err);
    //           }
    //           var id = this.lastID;
    //           db.run(
    //             "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
    //             [id, "https://www.facebook.com", profile.id],
    //             function (err) {
    //               if (err) {
    //                 return cb(err);
    //               }
    //               var user = {
    //                 id: id,
    //                 name: profile.displayName,
    //               };
    //               return cb(null, user);
    //             }
    //           );
    //         }
    //       );
    //     } else {
    //       // The account at Facebook has previously logged in to the app.  Get the
    //       // user record associated with the Facebook account and log the user in.
    //       db.get(
    //         "SELECT * FROM users WHERE id = ?",
    //         [cred.user_id],
    //         function (err, user) {
    //           if (err) {
    //             return cb(err);
    //           }
    //           if (!user) {
    //             return cb(null, false);
    //           }
    //           return cb(null, user);
    //         }
    //       );
    //     }
    //   }
    // );
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(profile);
    cb(null, {});
}));
// app.use(passport.initialize());
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/login/facebook", passport_1.default.authenticate("facebook"));
app.get("/oauth2/redirect/facebook", (req, res, next) => {
    console.log(req.headers);
    console.log(req.body);
    next();
}, passport_1.default.authenticate("facebook", {
    /*failureRedirect: '/login', failureMessage: true*/ session: false,
}), function (req, res) {
    //    res.redirect('/');
    res.send("AUTH WAS GOOD!");
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
