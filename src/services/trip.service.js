import { Trip, Route } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a trip
 *
 * @param {Object} tripBody
 * @returns {Promise<Trip>}
 */
const createTrip = async (tripBody) => {
  const trip = await Trip.create(tripBody);
  return trip;
};

/**
 * Query for trips
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryTrips = async (filter, options) => {
//   const Trips = await Trip.paginate(filter, options);
//   return Trips;
// };

/**
 * Get trip by id
 * @param {ObjectId} id
 * @returns {Promise<Trip>}
 */
const getTripById = async (id) =>
  Trip.findById(id)
    .populate('passenger')
    .populate('vehicle')
    .populate('route')
    .populate('driver');

/**
 * Get trip by user id
 * @param {ObjectId} id
 * @returns {Promise<Trip>}
 */
const getTripByUser = async (id) =>
  Trip.find({ passenger: id })
    .sort('-updatedAt')
    .populate('passenger')
    .populate('vehicle')
    .populate('route')
    .populate('driver');

/**
 * Get trip by driver id
 * @param {ObjectId} id
 * @returns {Promise<Trip>}
 */
const getTripByDriver = async (id) =>
  Trip.find({ driver: id })
    .sort('-updatedAt')
    .populate('passenger')
    .populate('vehicle')
    .populate('route')
    .populate('driver');

/**
* Get trip by vehicle id
* @param {ObjectId} id
* @returns {Promise<Vehicle>}
*/
const getTripByVehicle = async (id) =>
  Trip.find({ vehicle: id })
    .sort('-updatedAt')
    .populate('passenger')
    .populate('driver')
    .populate('route')
    .populate('vehicle');

/**
 * Get trips
 * @returns {Promise<Trip>}
 */
const getTrips = async () =>
  Trip.find()
    .sort('-updatedAt')
    .populate('passenger')
    .populate('route')
    .populate('vehicle')
    .populate('driver');

// /**
//  * Get trip by email
//  * @param {string} email
//  * @returns {Promise<Trip>}
//  */
// // const getTripByEmail = async (email) => Trip.findOne({ email });

/**
 * Update trip by id
 * @param {ObjectId} tripId
 * @param {Object} updateBody
 * @returns {Promise<Trip>}
 */
const updateTripById = async (tripId, updateBody) => {
  const trip = await getTripById(tripId);
  if (!trip) {
    throw new APIError(404, 'Trip not found');
  }

  Object.assign(trip, updateBody);
  await trip.save();

  return trip;
};

/**
 * Update trip by status
 * @param {ObjectId} tripId
 * @param {String} status
 * @returns {Promise<Trip>}
 */
const updateTripStatus = async (tripId, status) => {
  const trip = await getTripById(tripId);

  if (!trip) {
    throw new APIError(404, 'Trip not found');
  }

  // if (trip.status === 'denied' || trip.status === 'canceled') {
  //   throw new APIError(400, `You can't change this trip, is ${trip.status}`);
  // } else if (trip.status === 'in_process' || status !== 'completed') {
  //   throw new APIError(400, `You can't change this trip, is ${trip.status}`);
  // } else if (trip.status === 'accepted' || status !== 'in_process') {
  //   throw new APIError(400, `You can't change this trip, is ${trip.status}`);
  // }

  trip.status = status;
  await trip.save();

  return trip;
};

/** Function to search according to what the user is typing
* @param {string} keyword the query passed in the query params
* @returns {object} found data
*/
const getRouteByName = async (origin, destination) => {
  const result = await Route.findOne({ "subRoutes.name": { $all: [origin, destination] } });
  if (!result) {
    throw new APIError(404, `No route found`);
  }
  return result;
}


// /**
//  * Delete Trip by id
//  * @param {ObjectId} tripId
//  * @returns {Promise<Trip>}
//  */
// const deleteTripById = async (TripId) => {
//   const Trip = await getTripById(TripId);
//   if (!Trip) {
//     throw new APIError(404, 'Trip not found');
//   }
//   await Trip.remove();
//   return Trip;
// };

export default {
  createTrip,
  getTripById,
  updateTripById,
  getTripByUser,
  getTripByDriver,
  getTripByVehicle,
  updateTripStatus,
  getTrips,
  getRouteByName,
};
