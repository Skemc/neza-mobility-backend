import { Location } from '../models';
import logger from '../config/logger';

/**
 * Create a location
 *
 * @param {Object} locationBody
 * @returns {Promise<Trip>}
 */
const createLocation = async (locationBody) => {
  const location = await Location.create(locationBody);
  return location;
};

/**
 * Get locations
 * @param {ObjectId} id
 * @returns {Promise<location>}
 */
const getLocations = async () => {
  const location = await Location.find();
  return location;
};

/**
 * Get location by id
 * @param {ObjectId} id
 * @returns {Promise<location>}
 */
const getLocationById = async (id) => {
  const location = await Location.findById(id);
  return location;
};

/**
 * Get location by driver id
 * @param {ObjectId} driverId
 * @returns {Promise<location>}
 */
const getLocationByDriverId = async (driverId) => {
  const location = await Location.findById({ driver: driverId });
  return location;
};

/**
 * Update location by id
 * @param {ObjectId} LocationId
 * @param {Object} updateBody
 * @returns {Promise<Trip>}
 */
const updateLocationById = async (locationId, updateBody) => {
  const location = await getLocationById(locationId);
  if (!location) {
    createLocation(updateBody);
  }

  Object.assign(location, updateBody);
  await location.save();

  return location;
};

/**
 * Update current driver location
 * @param {Object} body
 * @returns {Promise<Trip>}
 */
const updateCurrentDriverLocation = async (body) => {
  logger.log('Location to update', body);
  const { driver, location } = body;
  const locationBody = {
    driver: driver.id,
    location: {
      type: 'Point',
      coordinates: [
        location.coords.longitude,
        location.coords.latitude,
      ],
    },
  };

  const isLocationExists = await getLocationByDriverId(driver.id);

  if (!isLocationExists) {
    await createLocation(locationBody);
  } else {
    Object.assign(location, locationBody);
    await location.save();
  }

  return location;
};

/**
 * Get nearby drivers
 * @param {Coordinates} coords
 * @returns {Promise<location>}
 */
const getNearByDrivers = async (coords) => {
  const { latitude, longitude } = coords;
  const drivers = await Location.find({
    location: {
      $near: {
        $maxDistance: 15000,
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
    },
  }).populate('driver');
  return drivers;
};

export default {
  createLocation,
  getLocations,
  getLocationById,
  getLocationByDriverId,
  updateLocationById,
  updateCurrentDriverLocation,
  getNearByDrivers,
};
