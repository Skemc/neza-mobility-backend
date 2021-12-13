import wrap from '../utils/wrapAsync';
import {
    tripService,
    notificationService,
    userService,
    routeService,
    vehicleService,
    companyService,
    driverService,
} from '../services';
// import redisClient from '../database/redis';
import {
    customResponseWithData,
    successResponseWithData,
    errorResponse,
} from '../utils/response';
// import logger from '../config/logger';

const placeTripOrder = wrap(async(req, res) => {
    const { origin, destination } = req.body;
    const findRouteByName = await tripService.getRouteByName(origin.name, destination.name);
    console.log(findRouteByName, "findRouteByName");
    const getVehicle = findRouteByName.id;
    console.log(getVehicle, "getVehicle");
    const findVehiclebyRouteCode = await vehicleService.getVehicleByRouteCode(getVehicle);

    successResponseWithData(res, 'Placed Order', { origin, destination, vehicle: findVehiclebyRouteCode });
});


const create = wrap(async(req, res) => {
    const {
        passenger,
        driver,
        vehicle,
        route,
        originName,
        originCoordinates,
        destinationName,
        destinationCoordinates,
        seatNumber,
        timeOfDeparture,
        ...rest
    } = req.body;

    const tripToCreate = {
        passenger,
        driver,
        vehicle,
        route,
        originName,
        originCoordinates: {
            type: 'Point',
            coordinates: [originCoordinates.longitude, originCoordinates.latitude],
        },
        destinationName,
        destinationCoordinates: {
            type: 'Point',
            coordinates: [destinationCoordinates.longitude, destinationCoordinates.latitude],
        },
        seatNumber,
        timeOfDeparture,
        status: 'pending',
        ...rest,
    };
    const trip = await tripService.createTrip(tripToCreate);
    // await userService.updateDriverStatusById(driver, false);

    const notificationBody = {
        trip: trip.id,
        passenger: trip.passenger,
        driver: trip.driver,
        TimeofDeparture: trip.timeOfDeparture,
        SeatNumber: trip.seatNumber,
        origin: trip.originName,
        destination: trip.destinationName,
        status: 'unread',
        message: `You have a new passenger at ${originName}`,
        type: 'new_request',
        owner: 'driver',
    };
    await notificationService.createNotification(notificationBody);
    customResponseWithData(
        res,
        201,
        'Trip has been created successfuly',
        trip,
    );
});

const list = wrap(async(req, res) => {
    const trips = await tripService.getTrips();

    successResponseWithData(res, 'Trip data', trips);
});

const getTripById = wrap(async(req, res) => {
    const { id } = req.params;
    const trip = await tripService.getTripById(id);

    if (!trip) {
        errorResponse(res, 404, 'Trip not found');
        return;
    }

    successResponseWithData(res, 'Trip data', trip);
});

const getTripByUser = wrap(async(req, res) => {
    const { id } = req.params;
    const trips = await tripService.getTripByUser(id);
    if (!trips) {
        errorResponse(res, 404, 'Trip not found');
        return;
    }

    successResponseWithData(res, 'Trip data for passenger', trips);
});

const getTripByDriver = wrap(async(req, res) => {
    const { id } = req.params;
    const trips = await tripService.getTripByDriver(id);
    if (!trips) {
        errorResponse(res, 404, 'Trip not found');
        return;
    }

    successResponseWithData(res, 'Trip data for driver', trips);
});

const getTripByVehicle = wrap(async(req, res) => {
    const { id } = req.params;
    const trips = await tripService.getTripByVehicle(id);
    if (!trips) {
        errorResponse(res, 404, 'Trip not found');
        return;
    }

    successResponseWithData(res, 'Trip data for vehicle', trips);
});

const accept = wrap(async(req, res) => {
    const { id } = req.params;
    const status = 'accepted';
    const trip = await tripService.updateTripStatus(id, status);

    const notificationBody = {
        trip: id,
        client: trip.client,
        driver: trip.driver,
        status: 'unread',
        message: 'Your order has been accepted, your driver is enroute',
        type: 'accepted_request',
        owner: 'passenger',
    };
    await notificationService.createNotification(notificationBody);

    successResponseWithData(
        res,
        'Trip has been accepted successfuly',
        trip,
    );
});

const deny = wrap(async(req, res) => {
    const { id } = req.params;
    const status = 'denied';
    const trip = await tripService.updateTripStatus(id, status);
    await userService.updateDriverStatusById(trip.driver, true);

    const notificationBody = {
        trip: id,
        client: trip.client,
        driver: trip.driver,
        status: 'unread',
        message: 'Your order has been denied, for some reasons',
        type: 'denied_request',
        owner: 'passenger',
    };
    await notificationService.createNotification(notificationBody);

    successResponseWithData(
        res,
        'Trip has been denied successfuly',
        trip,
    );
});

const begin = wrap(async(req, res) => {
    const { id } = req.params;
    const status = 'in_process';
    const trip = await tripService.updateTripStatus(id, status);

    const notificationBody = {
        trip: id,
        client: trip.client,
        driver: trip.driver,
        status: 'unread',
        message: 'Loading complete, moving towards final destination',
        type: 'began_request',
        owner: 'passenger',
    };
    await notificationService.createNotification(notificationBody);

    successResponseWithData(
        res,
        'Trip has been began successfuly',
        trip,
    );
});

const complete = wrap(async(req, res) => {
    const { id } = req.params;
    const status = 'completed';
    const trip = await tripService.updateTripStatus(id, status);
    await userService.updateDriverStatusById(trip.driver, true);

    const notificationBody = {
        trip: id,
        client: trip.client,
        driver: trip.driver,
        status: 'unread',
        message: 'The final destination offloading complete, click on the bell icon to proceed further',
        type: 'completed_request',
        owner: 'passenger',
    };
    await notificationService.createNotification(notificationBody);

    successResponseWithData(
        res,
        'Trip has been completed successfuly',
        trip,
    );
});

const cancel = wrap(async(req, res) => {
    const { id } = req.params;
    const status = 'canceled';
    const trip = await tripService.updateTripStatus(id, status);
    await userService.updateDriverStatusById(trip.driver, true);

    successResponseWithData(
        res,
        'Trip has been canceled successfuly',
        trip,
    );
});

const update = wrap(async(req, res) => {
    const trip = await tripService.updateTripStatus(
        req.params,
        req.body,
    );

    successResponseWithData(
        res,
        'Trip has been updated successfuly',
        trip,
    );
});

export default {
    placeTripOrder,
    create,
    list,
    getTripById,
    getTripByUser,
    getTripByDriver,
    getTripByVehicle,
    update,
    accept,
    deny,
    begin,
    complete,
    cancel,
};