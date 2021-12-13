import Joi from '@hapi/joi';
import { objectId } from './custom.schema';

const placeOrder = {
    body: Joi.object().keys({
        origin: Joi.object({
            name: Joi.string().required(),
            coordinates: Joi.object({
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required(),
            }),
        }),
        destination: Joi.object({
            name: Joi.string().required(),
            coordinates: Joi.object({
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required(),
            }),
        }),
    }),
};

const create = {
    body: Joi.object().keys({
        passenger: Joi.string().required().custom(objectId),
        driver: Joi.string().required().custom(objectId),
        vehicle: Joi.string().required().custom(objectId),
        route: Joi.string().required().custom(objectId),
        originName: Joi.string().required(),
        originCoordinates: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
        }),
        destinationName: Joi.string().required(),
        destinationCoordinates: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
        }),
        seatNumber: Joi.number(),
        timeOfDeparture: Joi.date().required(),
        tripFare: Joi.number().required(),
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
    placeOrder,
    create,
    changeStatus,
    params,
    update,
};