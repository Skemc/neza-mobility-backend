import Joi from '@hapi/joi';
import { objectId, password } from './custom.schema';

const userDeposit = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    amount: Joi.number().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

const params = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

export default {
  userDeposit,
  update,
  params,
  // adminRegister,
  // passengerUpdate,
  // favoritePlaces,
};
