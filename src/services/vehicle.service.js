import { Vehicle } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a vehicle
 *
 * @param {Object} vehicleBody
 * @returns {Promise<vehicle>}
 */

const createVehicle = async (vehicleBody) => {
  const {
    plateNo,
  } = vehicleBody;

  if (await Vehicle.isPlateNoUsed(plateNo)) {
    throw new APIError(409, 'Plate number already used');
  }

  const vehicle = await Vehicle.create(vehicleBody);
  return vehicle;
};


/**
 * Query for vehicle
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
 * Get all vehicles
 * @param {ObjectId} id
 * @returns {Promise<Trip>}
 */
const getVehicles = async () =>
  Vehicle.find()
    .populate('company')
    .populate('route')
    .populate('driver');

/**
 * Get vehicle by plateNo
 * @param {ObjectId} plateNo
 * @returns {Promise<Trip>}
 */
const getVehicleById = async (plateNo) =>
  Vehicle.findOne({ plateNo })
    .populate('company')
    .populate('route');

/**
* Get vehicle by route code
* @param {ObjectId} routeCode
* @returns {Promise<Trip>}
*/
const getVehicleByRouteCode = async (id) =>
  Vehicle.findOne({ route: id })
    .populate('company')
    .populate('driver')
    .populate('route');

/**
 * Update trip by plateNo
 * @param {ObjectId} plateNo
 * @param {Object} updateBody
 * @returns {Promise<Trip>}
 */
const updateVehicleById = async (plateNo, updateBody) => {
  const vehicle = await getVehicleById(plateNo);
  if (!vehicle) {
    throw new APIError(404, 'Vehicle not found');
  }

  Object.assign(vehicle, updateBody);
  await vehicle.save();

  return vehicle;
};

/**
 * Delete Trip by id
 * @param {ObjectId} vehicleId
 * @returns {Promise<Trip>}
 */
const deleteVehicleById = async (vehicleId) => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new APIError(404, 'Vehicle not found');
  }
  await vehicle.remove();
  return vehicle;
};

export default {
  createVehicle,
  getVehicles,
  getVehicleById,
  getVehicleByRouteCode,
  updateVehicleById,
  deleteVehicleById,
};
