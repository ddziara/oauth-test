import jwt from "jsonwebtoken";
import _ from "lodash";
import { ModelsType } from "./models";
import bcrypt from "bcrypt";

export const createTokens = async (user: Record<string, any>, secret: string) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ["id", "isAdmin"]),
    },
    secret,
    {
      expiresIn: "20m",
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, "id"),
    },
    secret,
    {
      expiresIn: "7d",
    }
  );

  return Promise.all([createToken, createRefreshToken]);
};

export const refreshTokens = async (
  token: string,
  refreshToken: string,
  models: ModelsType,
  SECRET: string
) => {
  let userId = -1;

  try {
    const {
      user: { id },
    } = jwt.verify(refreshToken, SECRET) as { user: { id: number } };
    userId = id;
  } catch (err) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  const [newToken, newRefreshToken] = await createTokens(user!, SECRET);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

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
