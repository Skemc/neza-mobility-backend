import redisClient from '../database/redis';
import logger from '../config/logger';

/**
 * Remember a present user with their user ID for 30 secs
 * @param {*} userId - The ID of the user
 * @param {*} connectionId - The ID of the connection
 */
const upsert = async (userId, connectionId) => {
  try {
    const canConnect = await redisClient.setAsync(
      userId,
      connectionId,
      'NX',
      'EX',
      30,
    );

    if (!canConnect) {
      logger.error(
        'Failed to store socket presence in redis: ALREADY_LOGGED_IN',
      );
    }
  } catch (error) {
    logger.error(
      `Failed to store socket presence in redis: ${error}`,
    );
  }
};

/**
 * Refresh a present user with their user ID
 * @param {*} userId - The ID of the user
 * @param {*} connectionId - The ID of the connection
 */
const refresh = async (userId, connectionId) => {
  try {
    await redisClient.setAsync(userId, connectionId, 'XX', 'EX', 30);
  } catch (error) {
    logger.error(
      `Failed to refresh socket presence in redis: ${error}`,
    );
  }
};

/**
 * Remove a presence. Used when someone disconnects
 *
 * @param {string} userId - The ID of the user
 * @param {object} meta - Any metadata about the connection
 * */
const remove = async (userId) => {
  try {
    await redisClient.delAsync(userId);
  } catch (error) {
    logger.error(
      `Failed to remove socket presence in redis: ${error}`,
    );
  }
};

/**
 * Cleans a list of connections by removing expired ones
 *
 * @param
 * */
const clean = (toDelete) => {
  logger.info(`Cleaning ${toDelete.length} expired presences`);

  toDelete.forEach((element) => {
    remove(element);
  });
};

/**
 * Returns a list of present users, minus any expired
 *
 * @param {function} returnPresent - callback to return the present users
 * */
const list = (returnPresent) => {
  const active = [];
  const dead = [];
  const now = Date.now();

  redisClient.hgetallAsync('presence', (err, presence) => {
    if (err) {
      logger.error(`Failed to get presence from Redis: ${err}`);
      return returnPresent([]);
    }

    presence.forEach((element) => {
      if (now - element.when > 8000) {
        dead.push(element);
      } else {
        active.push(element);
      }
    });

    if (dead.length) {
      clean(dead);
    }

    return returnPresent(active);
  });
};

/**
 * Add geo driver's location
 * @param {*} location - The object of location and driver
 */
const addLocation = async (location) => {
  try {
    const { driver, position } = location;
    logger.info(`location\n-----------------\n${location}`);
    const { latitude, longitude } = position.coords;
    await redisClient.geoaddAsync(
      'locations',
      longitude,
      latitude,
      driver.id,
    );
  } catch (error) {
    logger.error(
      `Failed to store location presence in redis: ${error}`,
    );
  }
};

/**
 * Remove location
 *
 * @param {string} userId - The ID of the user
 * */
const removeLocation = async (userId) => {
  try {
    await redisClient.zremAsync('locations', userId);
  } catch (error) {
    logger.error(`Failed to remove location in redis: ${error}`);
  }
};

/**
 * Get nearby drivers
 *
 * @param {string} userLocation - The coordinate of a user
 * */
const getNearByDrivers = async (userLocation) => {
  try {
    const { latitude, longitude } = userLocation;

    const nearByDrivers = await redisClient.georadiusAsync(
      'locations',
      longitude,
      latitude,
      '50000',
      'km',
      'WITHCOORD',
      'WITHDIST',
      'ASC',
    );

    return nearByDrivers;
  } catch (error) {
    logger.error(`Failed to get nearby drivers in redis: ${error}`);
    return [];
  }
};

export default {
  upsert,
  refresh,
  remove,
  list,
  addLocation,
  removeLocation,
  getNearByDrivers,
};
