import { Router } from 'express';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';
import routeController from '../controllers/route.controller';
import routeSchema from '../modules/route.schema';
import { RouteSchema } from '../modules';


const router = Router();

router.post(
    '/register',
    // auth,
    validate(routeSchema.createRoute),
    routeController.register,
);

router.patch(
    '/:code',
    validate(routeSchema.routeUpdate),
    routeController.updateRoute,
);

router.get(
    '/',
    routeController.listRoutes,
);

router.get(
    '/search',
    validate(RouteSchema.routeSearch),
    routeController.routeSearch,
);

router.get(
    '/name/:routeName',
    validate(routeSchema.nameParam),
    routeController.getRouteByName,
);

router.get(
    '/code/:routeCode',
    validate(routeSchema.codeParam),
    routeController.getRoute,
);



export default router;
