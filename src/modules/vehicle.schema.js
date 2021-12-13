import Joi from '@hapi/joi';
import { objectId } from './custom.schema';

const create = {
  body: Joi.object().keys({
    plateNo: Joi.string().required(),
    seatNumbers: Joi.string().required(),
    company: Joi.string().required(),
    route: Joi.string(),
    driver: Joi.string(),
  }),
};

const params = {
  params: Joi.object().keys({
    plateNo: Joi.string().required(),
  }),
};

const NameParam = {
  params: Joi.object().keys({
    routeCode: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    plateNo: Joi.string().required(),
  }),
  body: Joi.object().keys({
    plateNo: Joi.string().required(),
    seatNumbers: Joi.string().required(),
    company: Joi.string().required(),
    route: Joi.string(),
    driver: Joi.string(),
  }),
};

export default {
  create,
  params,
  NameParam,
  update,
};
