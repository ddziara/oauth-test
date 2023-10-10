declare module "passport-github2" {
  import * as express from "express";
  import { OutgoingHttpHeaders } from "http";
  import * as oauth2 from "passport-oauth2";

  export interface StrategyOptions {
    passReqToCallback?: false | undefined;
    clientID: string;
    clientSecret: string;
    callbackURL: string;

    customHeaders?: OutgoingHttpHeaders | undefined;
    scope?: string | string[] | undefined;
    scopeSeparator?: string | undefined;
    sessionKey?: string | undefined;
    store?: oauth2.StateStore | undefined;
    state?: any;
    skipUserProfile?: any;
    pkce?: boolean | undefined;
    proxy?: any;
    enableProof?: boolean | undefined;
    profileFields?: string[] | undefined;

    authorizationURL?: string | undefined;
    tokenURL?: string | undefined;
    profileURL?: string | undefined;
    graphAPIVersion?: string | undefined;
  }

  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => void;

  export class Strategy extends oauth2.Strategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    // constructor(
    //   options: StrategyOptionsWithRequest,
    //   verify: VerifyFunctionWithRequest
    // );
    authenticate(req: express.Request, options?: object): void;
  }
}
