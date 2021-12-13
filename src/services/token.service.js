import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import userService from './user.service';
import redisClient from '../database/redis';
import APIError from '../utils/APIError';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {String} email
 * @param {Moment} expires
 * @returns {string}
 */
const generateToken = (userId, expires) => {
  const payload = {
    sub: userId,
    // iat: moment().unix(),
    // exp: expires.unix(),
  };
  return jwt.sign(payload, config.jwt.secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (userId, token, expires, type) => {
  await redisClient.setAsync(
    userId,
    JSON.stringify({
      type,
      token,
      expires,
    }),
  );
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  // const tokenDoc = await Token.findOne({
  //   token, type, user: payload.sub, blacklisted: false,
  // });
  // if (!tokenDoc) {
  //   throw new Error('Token not found');
  // }
  return payload; // tokenDoc
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'days',
  );
  const accessToken = generateToken(user.id, accessTokenExpires);

  // return accessToken;

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days',
  );
  const refreshToken = generateToken(user.id, refreshTokenExpires);
  await saveToken(
    user.id,
    refreshToken,
    refreshTokenExpires,
    'refresh',
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new APIError(404, 'No user found with this email');
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes',
  );
  const resetPasswordToken = generateToken(user.id, expires);
  await saveToken(
    user.id,
    resetPasswordToken,
    expires,
    'resetPassword',
  );
  return resetPasswordToken;
};

export default {
  generateToken,
  //   saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
};
