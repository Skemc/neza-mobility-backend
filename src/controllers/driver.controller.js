import wrap from '../utils/wrapAsync';
import {
    driverService,
    tokenService,
    emailService,
} from '../services';
import {
    customResponseWithData,
    successResponseWithData,
    successResponse,
    customResponse,
} from '../utils/response';

const driverRegister = wrap(async(req, res) => {
    const { email, firstName, lastName } = req.body;
    const driver = await driverService.createDriver(req.body);
    const token = await tokenService.generateToken(driver.driverID);
    await emailService.sendConfirmEmail(email, token);
    customResponseWithData(
        res,
        201,
        'User has been registered successfuly', { driver, token },
    );
});

const driverLogin = wrap(async(req, res) => {
    const { driverID, busID, route } = req.body;
    const driver = await driverService.loginDriverWithDriverIdAndBusIdAndRoute(
        driverID,
        busID,
        route,

    );
    const token = await tokenService.generateToken(driver.driverID);
    successResponseWithData(res, 'Logged in successfuly', {
        user: driver,
        token,
    });
});

const driverUpdate = wrap(async(req, res) => {
    const { driverID } = req.params;
    const driver = await driverService.updateDriverById(driverID, req.body);

    successResponseWithData(
        res,
        'Driver has been updated successfuly',
        driver,
    );
});

const getDriver = wrap(async(req, res) => {
    const { driverID } = req.params;
    const driver = await driverService.getDriverByDriverId(driverID);

    successResponseWithData(res, 'Driver data', driver);
});

const listDrivers = wrap(async(req, res) => {
    const drivers = await driverService.getDrivers();

    successResponseWithData(res, 'Drivers data', drivers);
});


const refreshTokens = wrap(async(req, res) => {
    const { refreshToken } = req.body;
    const tokens = await driverService.refreshAuth(refreshToken);
    successResponseWithData(res, 'Refreshed tokens successfuly', {
        tokens,
    });
});

const forgotPassword = wrap(async(req, res) => {
    const { email } = req.body;
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
        email,
    );
    await emailService.sendResetPasswordEmail(
        email,
        resetPasswordToken,
    );
    successResponse(res, 'Reset password link was sent to your email');
});

const resetPassword = wrap(async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    await driverService.resetPassword(token, password);
    customResponse(
        res,
        204,
        'Your password has been reset successfuly',
    );
});

export default {
    driverRegister,
    driverLogin,
    driverUpdate,
    getDriver,
    listDrivers,
    refreshTokens,
    forgotPassword,
    resetPassword,
};