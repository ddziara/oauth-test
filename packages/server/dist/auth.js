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
exports.refreshTokens = exports.createTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const createTokens = (user, secret) => __awaiter(void 0, void 0, void 0, function* () {
    const createToken = jsonwebtoken_1.default.sign({
        user: lodash_1.default.pick(user, ["id", "isAdmin"]),
    }, secret, {
        expiresIn: "20m",
    });
    const createRefreshToken = jsonwebtoken_1.default.sign({
        user: lodash_1.default.pick(user, "id"),
    }, secret, {
        expiresIn: "7d",
    });
    return Promise.all([createToken, createRefreshToken]);
});
exports.createTokens = createTokens;
const refreshTokens = (token, refreshToken, models, SECRET) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = -1;
    try {
        const { user: { id }, } = jsonwebtoken_1.default.verify(refreshToken, SECRET);
        userId = id;
    }
    catch (err) {
        return {};
    }
    const user = yield models.User.findOne({ where: { id: userId }, raw: true });
    const [newToken, newRefreshToken] = yield (0, exports.createTokens)(user, SECRET);
    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
});
exports.refreshTokens = refreshTokens;
// export const tryLogin = async (
//   email: string,
//   password: string,
//   models: ModelsType,
//   SECRET: string
// ) => {
//   const user = await models.User.findOne({ where: { email }, raw: true });
//   if (!user) {
//     // user with provided email not found
//     throw new Error("Invalid login");
//   }
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) {
//     // bad password
//     throw new Error("Invalid login");
//   }
//   const [token, refreshToken] = await createTokens(user, SECRET);
//   return {
//     token,
//     refreshToken,
//   };
// };
//# sourceMappingURL=auth.js.map