import tokenService from './token.service';
import userService from './user.service';
// import routeService from './route.service';
import APIError from '../utils/APIError';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new APIError(401, 'Incorrect email or password');
  }
  if (user.isVerified === false) {
    throw new APIError(404).json(
      404, 
      'Account is yet not verified, Check your email address for account Verification' 
    );
  }
  return user;
};

// /**
//  * Login with firstName and password
//  * @param {string} firstName
//  * @param {string} password
//  * @returns {Promise<User>}
//  */
// const loginUserWithfirstNameAndPassword = async (firstName, password) => {
//   const user = await userService.getUserByName(firstName);
//   if (!user || !(await user.isPasswordMatch(password))) {
//     throw new APIError(401, 'Incorrect firstName or password');
//   }
//   return user;
// };

// /**
//  * Login with driverId and busId and route
//  * @param {string} driverId
//  * @param {string} busId
//  * @param {string} route
//  * @returns {Promise<User>}
//  */
// const loginDriverWithDriverIdAndBusIdAndRoute = async (driverId, busId, route) => {
//   const user = await userService.getDriverById(driverId);
//   const vehicle = await userService.getVehicleById(busId);
//   const routee = await routeService.getRouteByCode(route);
//   if (!user || !vehicle || !routee) {
//     throw new APIError(401, 'Incorrect credentials');
//   }
//   return user;
// };

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      'refresh',
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new APIError(401, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      'resetPassword',
    );
    const user = await userService.getUserById(
      resetPasswordTokenDoc.sub,
    );
    if (!user) {
      throw new APIError(
        404,
        'Looks like there is no account associated with your Email',
      );
    }
    // await Token.deleteMany({ user: user.id, type: 'resetPassword' });
    await userService.updateUserById(user.id, {
      password: newPassword,
    });
  } catch (error) {
    throw new APIError(401, 'Password reset failed');
  }
};

export default {
  loginUserWithEmailAndPassword,
  // loginUserWithfirstNameAndPassword,
  // loginDriverWithDriverIdAndBusIdAndRoute,
  refreshAuth,
  resetPassword,
};
