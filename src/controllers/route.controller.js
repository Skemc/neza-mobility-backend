import wrap from '../utils/wrapAsync';
import {
    routeService,
} from '../services';
import {
    customResponseWithData,
    successResponseWithData,
} from '../utils/response';

const register = wrap(async (req, res) => {
    const { routeOriginCoordinates, routeDestinationCoordinates, subRoutes, ...rest } = req.body;
    const routeCreate = {
        ...rest,
        routeOriginCoordinates: {
            type: 'Point',
            coordinates: [routeOriginCoordinates.longitude, routeOriginCoordinates.latitude]
        },
        routeDestinationCoordinates: {
            type: 'Point',
            coordinates: [routeDestinationCoordinates.longitude, routeDestinationCoordinates.latitude]
        },
        subRoutes: subRoutes.map(sub => (
            {
                name: sub.name,
                coordinates: {
                    type: 'Point',
                    coordinates: [sub.coordinates.longitude, sub.coordinates.latitude]
                }
            }
        ))
    };
    const route = await routeService.createRoute(routeCreate);
    customResponseWithData(
        res,
        201,
        'Route has been registered successfuly',
        route,
    );
});

const updateRoute = wrap(async (req, res) => {
    const { code } = req.params;
    const route = await routeService.updateRouteByCode(code, req.body);

    successResponseWithData(
        res,
        'Route has been updated successfuly',
        route,
    );
});

const getRoute = wrap(async (req, res) => {
    const { routeCode } = req.params;
    const route = await routeService.getRouteByCode(routeCode);

    successResponseWithData(res, 'Route data', route);
});

const getRouteByName = wrap(async (req, res) => {
    const { routeName } = req.params;
    const route = await routeService.getRouteByName(routeName);

    successResponseWithData(res, 'Route data', route);
});

const listRoutes = wrap(async (req, res) => {
    const route = await routeService.getRoutes();
    successResponseWithData(res, 'Route data', route);
});

const routeSearch = wrap(async (req, res) => {
    const { keyword } = req.query;
    const result = await routeService.routeSearch(keyword);
    successResponseWithData(res, `The results for ${keyword}`, result);
});

const routeSearching = wrap(async (req, res) => {
    const { origin, destination } = req.query;
    const result = await routeService.routeSearching(origin, destination);
    console.log(result);
    successResponseWithData(res, `The results for `, result);
});


export default {
    register,
    updateRoute,
    routeSearch,
    getRoute,
    getRouteByName,
    routeSearching,
    listRoutes,
};