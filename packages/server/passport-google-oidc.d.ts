declare module 'passport-google-oidc' {
    import * as openidconnect from "passport-openidconnect";
    import { Profile as passportProfile } from "passport";

    export interface StrategyOptions {
        // issuer: string;
        // authorizationURL: string;
        // tokenURL: string;
        callbackURL: string;
        // userInfoURL: string;
        clientID: string;
        clientSecret: string;

        // acrValues?: string | undefined;
        // agent?: boolean | Agent | undefined;
        // claims?: object | undefined;
        // customHeaders?: OutgoingHttpHeaders | undefined;
        // display?: string | undefined;
        // idTokenHint?: string | undefined;
        // loginHint?: string | undefined;
        // maxAge?: string | undefined;
        // nonce?: string | undefined;
        // prompt?: string | undefined;
        // proxy?: boolean | undefined;
        // responseMode?: string | undefined;
        // scope?: string | string[] | undefined;
        // uiLocales?: string | undefined;

        /**
         * If defined, the {@link express.Request | Request} object will be passed into {@link VerifyFunction}
         */
        // passReqToCallback?: boolean | undefined;
        /**
         * Unique session identifier for this particular provider.
         * If none is given, the provider's hostname will be used.
         */
        // sessionKey?: string | undefined;
        /**
         * Session store instance with interface compliant to {@link SessionStore}
         */
        // store?: SessionStore | undefined;
        /**
         * If defined, skips the loading of the user profile
         */
        // skipUserProfile?: boolean | undefined;
    }

    type Profile = passportProfile;

    type VerifyCallback = (err?: Error | null, user?: Express.User, info?: any) => void;

    type VerifyFunction =
        | ((issuer: string, profile: Profile, done: VerifyCallback) => void);

    export class Strategy extends openidconnect.Strategy {
        constructor(options: StrategyOptions, verify: VerifyFunction);
        
        // constructor(
        //   options: StrategyOptionsWithRequest,
        //   verify: VerifyFunctionWithRequest
        // );
        authenticate(req: express.Request, options?: object): void;
           
    }       
}

