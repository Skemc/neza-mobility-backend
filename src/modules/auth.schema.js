import Joi from '@hapi/joi';
import { password } from './custom.schema';

const passengerLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// const driverLogin = {
//   body: Joi.object().keys({
//     driverID: Joi.string().required(),
//     busID: Joi.string().required(),
//     route: Joi.string().required(),
//   }),
// };

// const adminLogin = {
//   body: Joi.object().keys({
//     email: Joi.string().required(),
//     password: Joi.string().required(),
//   }),
// };

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export default {
  passengerLogin,
  // driverLogin,
  // adminLogin,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
