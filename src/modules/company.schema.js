import Joi from '@hapi/joi';
import { objectId } from './custom.schema';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
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
    name: Joi.string().required(),
  }),
};

export default {
  create,
  params,
  update,
};
