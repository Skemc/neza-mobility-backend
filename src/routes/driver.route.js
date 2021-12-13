import { Router } from 'express';
import driverController from '../controllers/driver.controller';
import validate from '../middlewares/validate';
import { driverSchema } from '../modules';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/driver-register',
  auth,
  validate(driverSchema.driverRegister),
  driverController.driverRegister,
);

router.post(
  '/driver-login',
  validate(driverSchema.driverLogin),
  driverController.driverLogin,
);

router.post(
  '/forgot-password',
  validate(driverSchema.forgotPassword),
  driverController.forgotPassword,
);
router.post(
  '/reset-password/:token',
  validate(driverSchema.resetPassword),
  driverController.resetPassword,
);

router.get(
  '/',
  driverController.listDrivers,
);


router.get(
  '/:driverID',
  validate(driverSchema.params),
  driverController.getDriver,
);
router.patch(
  '/:id',
  validate(driverSchema.driverUpdate),
  driverController.driverUpdate,
);

export default router;
