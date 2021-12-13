import { Route } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a route
 * @param {Object} routeBody
 * @returns {Promise<Route>}
 */
const createRoute = async (routeBody) => {
    const {
        routeName,
        routeCode,
    } = routeBody;

    if (await Route.isNameUsed(routeName)) {
        throw new APIError(409, 'Name already used');
    }
    if (await Route.isCodeUsed(routeCode)) {
        throw new APIError(409, 'Code already used');
    }

    const route = await Route.create(routeBody);
    return route;
};

/**
* Get route by code
* @param {string} code
* @returns {Promise<Route>}
*/
const getRouteByCode = async (routeCode) => Route.findOne({ routeCode });

/**
* Get route by routeName
* @param {string} routeName
* @returns {Promise<Route>}
*/
const getRouteByName = async (routeName) => Route.findOne({ routeName });

/**
 * Update route by code
 * @param {ObjectId} code
 * @param {Object} updateBody
 * @returns {Promise<Route>}
 */
const updateRouteByCode = async (code, updateBody) => {
    const route = await getRouteByCode(code);

    if (!route) {
        throw new APIError(404, 'Route not found');
    }
    Object.assign(route, updateBody);
    await route.save();
    return route;
};

/**
 * Get Routes
 * @returns {Promise<Route>}
 */
const getRoutes = async () =>
    Route.find()
        .sort('-updatedAt');


/** Function to search according to what the user is typing
  * @param {string} keyword the query passed in the query params
  * @returns {object} found data
  */
const routeSearch = async (keyword) => {
    // const result = await Route.find({ 'subRoutes.name': {$regex: `${keyword}`, $options: 'i'}  })
    const result = await Route.aggregate([
        {
            "$match": {
                "subRoutes.name": { $regex: keyword, $options: 'i' }, //regex
            }
        },
        {
            "$project": {
                "routeName": 1,
                "routeCode": 1,
                "routeOrigin": 1,
                "routeOriginCoordinates": 1,
                "routeDestination": 1,
                "routeDestinationCoordinates": 1,
                "subRoutes": {
                    "$filter": {
                        "input": "$subRoutes",
                        "as": "subRoutes",
                        "cond": {
                            "$regexMatch": {
                                "input": '$$subRoutes.name',
                                "regex": keyword,
                                "options": 'i'
                            }
                        }, //regex
                    }
                }
            }
        }
    ])

    if (result.length === 0) {
        throw new APIError(404, `Ooops. Nothing was found for ${keyword}`);
    }

    return result;
}



export default {
    createRoute,
    getRouteByCode,
    routeSearch,
    updateRouteByCode,
    getRoutes,
    getRouteByName,
};