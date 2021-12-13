import { Router } from 'express';
import tripController from '../controllers/trip.controller';
import validate from '../middlewares/validate';
import tripSchema from '../modules/trip.schema';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/place-order',
  validate(tripSchema.placeOrder),
  tripController.placeTripOrder,
);

router.post(
  '/create',
  validate(tripSchema.create),
  tripController.create,
);

router.get(
  '/',
  tripController.list,
);

router.get(
  '/:id',
  validate(tripSchema.params),
  tripController.getTripById,
);

router.get(
  '/user/:id',
  validate(tripSchema.params),
  tripController.getTripByUser,
);

router.get(
  '/driver/:id',
  validate(tripSchema.params),
  tripController.getTripByDriver,
);

router.get(
  '/vehicle/:id',
  validate(tripSchema.params),
  tripController.getTripByVehicle,
);

router.patch(
  '/:id/accept',
  validate(tripSchema.changeStatus),
  tripController.accept,
);

router.patch(
  '/:id/deny',
  validate(tripSchema.changeStatus),
  tripController.deny,
);

router.patch(
  '/:id/begin',
  validate(tripSchema.changeStatus),
  tripController.begin,
);

router.patch(
  '/:id/complete',
  validate(tripSchema.changeStatus),
  tripController.complete,
);

router.patch(
  '/:id/cancel',
  validate(tripSchema.changeStatus),
  tripController.cancel,
);

export default router;
