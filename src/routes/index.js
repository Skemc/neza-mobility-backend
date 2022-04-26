import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import driverRoute from './driver.route';
// import testRoute from './test.route';
import tripRoute from './trip.route';
import vehicleRoute from './vehicle.route';
import companyRoute from './company.route';
import chatRoute from './chat.route';
import routesRoute from './routes.route';
import walletRoute from './wallet.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/drivers', driverRoute);
router.use('/trips', tripRoute);
// router.use('/test', testRoute);
router.use('/vehicles', vehicleRoute);
router.use('/company', companyRoute);
router.use('/chats', chatRoute);
router.use('/routes', routesRoute);
router.use('/wallet', walletRoute);

export default router;