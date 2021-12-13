import Joi from '@hapi/joi';
import { objectId } from './custom.schema';

const create = {
  body: Joi.object().keys({
    senderId: Joi.string().required().custom(objectId),
    receiverId: Joi.string().required().custom(objectId),
  }),
};

const changeStatus = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const params = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().required(),
  }),
};

export default {
  create,
  changeStatus,
  params,
  update,
};
