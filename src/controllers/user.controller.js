import wrap from '../utils/wrapAsync';
import { userService } from '../services';
import { successResponseWithData } from '../utils/response';

const update = wrap(async (req, res) => {
  const { id } = req.params;
  const user = await userService.updateUserById(id, req.body);

  successResponseWithData(
    res,
    'User has been updated successfuly',
    user,
  );
});

const getUser = wrap(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  successResponseWithData(res, 'User data', user);
});

const getDriver = wrap(async (req, res) => {
  const { id } = req.params;
  const driver = await userService.getDriverById(id);

  successResponseWithData(res, 'Driver data', driver);
});

const updateDriverStatus = wrap(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = await userService.updateDriverStatusById(id, status);

  successResponseWithData(
    res,
    'Status has been updated successfuly',
    user,
  );
});

export default {
  update,
  getUser,
  getDriver,
  updateDriverStatus,
};
