import { Driver } from '../models';
import tokenService from './token.service';
import APIError from '../utils/APIError';
import { routeService, vehicleService } from '../services'

/**
 * Create a Driver
 * @param {Object} driverBody
 * @returns {Promise<Driver>}
 */
const createDriver = async (driverBody) => {
    const {
        email,
        phoneNumber,
        driverID
    } = driverBody;

    if (await Driver.isEmailUsed(email)) {
        throw new APIError(409, 'Email already used');
    }
    if (await Driver.isPhoneNumberUsed(phoneNumber)) {
        throw new APIError(409, 'Phone number already used');
    }
    if (await Driver.isIdUsed(driverID)) {
        throw new APIError(409, 'Drivers ID already used');
    }

    const newDriver = { ...driverBody, userType: 'driver' };

    const driver = await Driver.create(newDriver);
    return driver;
};

/**
 * Get Drivers
 * @returns {Promise<Driver>}
 */
const getDrivers = async () =>
    Driver.find()
        .sort('-updatedAt');

/**
* Get Driver by ID
* @param {ObjectId} driverID
* @returns {Promise<Driver>}
*/
const getDriverByDriverId = async (driverID) => Driver.findOne({ driverID });

/**
 * Get Driver by id
 * @param {ObjectId} id
 * @returns {Promise<Driver>}
 */
const getDriverById = async (id) =>
    Driver.findById(id);


/**
 * Get Driver by email
 * @param {string} email
 * @returns {Promise<Driver>}
 */
const getDriverByEmail = async (email) => Driver.findOne({ email });

/**
 * Get Driver by name
 * @param {string} firstName
 * @returns {Promise<Driver>}
 */
const getDriverByName = async (firstName) => Driver.findOne({ firstName });

/**
 * Update Driver by id
 * @param {ObjectId} driverID
 * @param {Object} updateBody
 * @returns {Promise<Driver>}
 */
const updateDriverById = async (driverID, updateBody) => {
    const driver = await getDriverById(driverID);
    if (!driver) {
        throw new APIError(404, 'Driver not found');
    }
    Object.assign(driver, updateBody);
    await driver.save();
    return driver;
};

/**
* Login with driverID and busId and route
* @param {string} driverID
* @param {string} id
* @param {string} code
* @returns {Promise<Driver>}
*/
const loginDriverWithDriverIdAndBusIdAndRoute = async (driverID, id, code) => {
    const driver = await getDriverByDriverId(driverID);
    const vehicle = await vehicleService.getVehicleById(id);
    const route = await routeService.getRouteByCode(code);
    // const owner = driver.id != vehicle.driver;
    if (!driver || !vehicle || !route) {
        throw new APIError(401, 'Incorrect credentials');
    }
    if (driver.id != vehicle.driver) {
        throw new APIError(401, 'not the driver');
    }
    return driver;
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(
            refreshToken,
            'refresh',
        );
        const driver = await getDriverById(refreshTokenDoc.driver);
        if (!driver) {
            throw new Error();
        }
        await refreshTokenDoc.remove();
        return tokenService.generateAuthTokens(driver);
    } catch (error) {
        throw new APIError(401, 'Please authenticate');
    }
};

/**
* Reset password
* @param {string} resetPasswordToken
* @param {string} newPassword
* @returns {Promise}
*/
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(
            resetPasswordToken,
            'resetPassword',
        );
        const driver = await getDriverById(
            resetPasswordTokenDoc.sub,
        );
        if (!driver) {
            throw new APIError(
                404,
                'Looks like there is no account associated with your Email',
            );
        }
        // await Token.deleteMany({ user: user.id, type: 'resetPassword' });
        await updateDriverById(driverID, {
            password: newPassword,
        });
    } catch (error) {
        throw new APIError(401, 'Password reset failed');
    }
};

export default {
    createDriver,
    getDriverById,
    getDrivers,
    getDriverByDriverId,
    getDriverByEmail,
    getDriverByName,
    refreshAuth,
    updateDriverById,
    loginDriverWithDriverIdAndBusIdAndRoute,
    resetPassword,
};
