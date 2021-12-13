import Joi from '@hapi/joi';
import { objectId, password } from './custom.schema';

const driverRegister = {
    body: Joi.object().keys({
        driverID: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().email(),
    }),
};

const driverLogin = {
    body: Joi.object().keys({
        driverID: Joi.string().required(),
        busID: Joi.string().required(),
        route: Joi.string().required(),
    }),
};

const driverUpdate = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().email(),
    }),
};

const params = {
    params: Joi.object().keys({
        driverID: Joi.string().required(),
    }),
};
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
    driverRegister,
    driverLogin,
    driverUpdate,
    params,
    refreshTokens,
    forgotPassword,
    resetPassword,
};