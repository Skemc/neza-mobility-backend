import { User } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createPassenger= async (userBody) => {
  const {
    email,
    phoneNumber,
  } = userBody;

  if (await User.isEmailUsed(email)) {
    throw new APIError(409, 'Email already used');
  }
  if (await User.isPhoneNumberUsed(phoneNumber)) {
    throw new APIError(409, 'Phone number already used');
  }

  const newUser = { ...userBody, userType: 'passenger' };
  const user = await User.create(newUser);
  return user;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
// const createDriver= async (userBody) => {
//   const {
//     email,
//     phoneNumber,
//   } = userBody;

//   if (await User.isEmailUsed(email)) {
//     throw new APIError(409, 'Email already used');
//   }
//   if (await User.isPhoneNumberUsed(phoneNumber)) {
//     throw new APIError(409, 'Phone number already used');
//   }

//   const newUser = { ...userBody, userType: 'driver' };

//   const user = await User.create(newUser);
//   return user;
// };

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryUsers = async (filter, options) => {
//   const users = await User.paginate(filter, options);
//   return users;
// };

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => User.findById(id);

// /**
//  * Get driver by id
//  * @param {ObjectId} id
//  * @returns {Promise<User>}
//  */
// const getDriverById = async (id) =>
//   User.findById(id).populate('truckType');

// /**
//  * Get driver by truck id
//  * @param {ObjectId} truckId
//  * @returns {Promise<User>}
//  */
// const getDriversByTruckId = async (truckId) => {
//   const drivers = await User.find({
//     truckType: truckId,
//     available: true,
//   }).populate('truckType');

//   return drivers;
// };

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email });


/**
 * Get user by name
 * @param {string} firstName
 * @returns {Promise<User>}
 */
const getUserByName = async (firstName) => User.findOne({ firstName });


// /**
//  * Get vehicle by id
//  * @param {ObjectId} id
//  * @returns {Promise<Vehicle>}
//  */
// const getVehicleById = async (id) => Vehicle.findById(id).populate('truckType');

// /**
//  * Get route by code
//  * @param {ObjectId} code
//  * @returns {Promise<Route>}
//  */
// const getRouteByCode = async (code) => Route.findById({ code });


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  // const { email, userName } = updateBody;

  if (!user) {
    throw new APIError(404, 'User not found');
  }
  /* if (await User.isEmailUsed(email)) {
    throw new APIError(409, 'Email already used');
  }
  if (await User.isUserNameUsed(userName)) {
    throw new APIError(409, 'User name already used');
  } */

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

// /**
//  * Update driver status by id
//  * @param {ObjectId} driverId
//  * @param {Boolean} status
//  * @returns {Promise<Driver>}
//  */
// const updateDriverStatusById = async (driverId, status) => {
//   const driver = await getUserById(driverId);

//   if (!driver) {
//     throw new APIError(404, 'Driver not found');
//   }

//   driver.available = status;
//   await driver.save();
//   return driver;
// };

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new APIError(404, 'User not found');
//   }
//   await user.remove();
//   return user;
// };

export default {
  createPassenger,
  // createDriver,
  getUserByName,
  getUserById,
  // getDriverById,
  // // getRouteByCode,
  // getDriversByTruckId,
  // getVehicleById,
  getUserByEmail,
  updateUserById,
  // updateDriverStatusById,
};
