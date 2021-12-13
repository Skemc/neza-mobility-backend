import { Router } from 'express';
import vehicleController from '../controllers/vehicle.controller';
import validate from '../middlewares/validate';
import vehicleSchema from '../modules/vehicle.schema';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/register',
  // auth,
  validate(vehicleSchema.create),
  vehicleController.create,
);

router.get(
  '/',
  vehicleController.list,
);

router.get(
  '/:plateNo',
  validate(vehicleSchema.params),
  vehicleController.getVehicle,
);

router.get(
  '/name/:routeCode',
  validate(vehicleSchema.NameParam),
  vehicleController.getVehicleByRouteCode,
);

router.patch(
  '/:plateNo',
  validate(vehicleSchema.update),
  vehicleController.updateVehicle,
);

export default router;
