import Joi from '@hapi/joi';
import { objectId, password } from './custom.schema';

const passengerRegister = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')),
    // userType: Joi.string().required(),
  }),
};

// const driverRegister = {
//   body: Joi.object().keys({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     phoneNumber: Joi.string().required(),
//     email: Joi.string().email(),
//     driverId: Joi.number().required(),
//     homeAddress: Joi.string(),
//     userType: Joi.string().required(),
//   }),
// };

// const adminRegister = {
//   body: Joi.object().keys({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     phoneNumber: Joi.string().required(),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().custom(password),
//     homeAddress: Joi.string(),
//     userType: Joi.string().required(),
//   }),
// };

const passengerUpdate = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userType: Joi.string().required(),
  }),
};

const favoritePlaces = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    homeAddress: Joi.string(),
    workAddress: Joi.string(),
    marketAddress: Joi.string(),
  }),
};

const params = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

export default {
  passengerRegister,
  // driverRegister,
  // adminRegister,
  passengerUpdate,
  favoritePlaces,
  params,
};
