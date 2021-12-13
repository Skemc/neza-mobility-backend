import { Router } from 'express';
import authController from '../controllers/auth.controller';
// import confirmController from '../controllers/confirm.controller';
import validate from '../middlewares/validate';
import { authSchema, userSchema } from '../modules';

const router = Router();

router.post(
  '/register',
  validate(userSchema.passengerRegister),
  authController.register,
);
// router.post(
//   '/driver-register',
//   validate(userSchema.driverRegister),
//   authController.driverRegister,
// );
// router.post(
//   '/admin-register',
//   validate(userSchema.adminRegister),
//   authController.adminRegister,
// );
router.post(
  '/login',
  validate(authSchema.passengerLogin),
  authController.login,
);
// router.post(
//   '/driver-login',
//   validate(authSchema.driverLogin),
//   authController.driverLogin,
// );
// router.post(
//   '/admin-login',
//   validate(authSchema.adminLogin),
//   authController.login,
// );
// router.post('/refresh-tokens', validate(authSchema.refreshTokens), authController.refreshTokens);
router.post(
  '/forgot-password',
  validate(authSchema.forgotPassword),
  authController.forgotPassword,
);
router.post(
  '/reset-password/:token',
  validate(authSchema.resetPassword),
  authController.resetPassword,
);

// router.post('/confirmation/:emailToken', confirmController.verifyingUsers);

export default router;
