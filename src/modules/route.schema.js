import Joi from '@hapi/joi';
import { objectId } from './custom.schema';

const createRoute = {
    body: Joi.object().keys({
        routeName: Joi.string().required(),
        routeCode: Joi.number().required(),
        routeOrigin: Joi.string().required(),
        routeOriginCoordinates: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
          }),
        routeDestination: Joi.string().required(),
        routeDestinationCoordinates: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
          }),
        routeFare: Joi.number().required(),
        subRoutes: Joi.array().items({
            name: Joi.string().required(),
            coordinates: Joi.object({
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required(),
             }),
        }).required(),
    }),
};

const routeUpdate = {
    params: Joi.object().keys({
        code: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        routeCode: Joi.string().required(),
        routeOrigin: Joi.string().required(),
        routeOriginCoordinates: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
          }),
        routeDestination: Joi.string().required(),
        routeDestinationCoordinates: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
          }),
          routeFare: Joi.string().required(),
          subRoutes: Joi.array().items({
            name: Joi.string().required(),
            coordinates: Joi.object({
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required(),
             }),
        }).required(),
      }),
};

const codeParam = {
    params: Joi.object().keys({
        routeCode: Joi.string().required(),
    }),
};

const nameParam = {
    params: Joi.object().keys({
        routeName: Joi.string().required(),
    }),
};

const routeSearch = {
    query: Joi.object().keys({
        keyword: Joi.string().required(),
    }),
};


export default {
    createRoute,
    routeUpdate,
    routeSearch,
    codeParam,
    nameParam,
}; 