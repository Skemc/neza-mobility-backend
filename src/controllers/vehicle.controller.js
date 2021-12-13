import wrap from '../utils/wrapAsync';
import { vehicleService } from '../services';
import {
  customResponseWithData,
  successResponseWithData,
  errorResponse,
} from '../utils/response';


const create = wrap(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);

  customResponseWithData(
    res,
    201,
    'Vehicle has been created successfuly',
    vehicle,
  );
});

const list = wrap(async (req, res) => {
  const vehicles = await vehicleService.getVehicles();

  if (!vehicles.length) {
    errorResponse(res, 404, 'Vehicles found');
    return;
  }

  successResponseWithData(res, 'Vehicles data', vehicles);
});

const getVehicle = wrap(async (req, res) => {
  const { plateNo } = req.params;
  const vehicle = await vehicleService.getVehicleById(plateNo);

  if (!vehicle) {
    errorResponse(res, 404, 'Vehicle not found');
    return;
  }

  successResponseWithData(res, 'Vehicles data', vehicle);
});

const getVehicleByRouteCode = wrap(async (req, res) => {
  const { routeCode } = req.params;
  const vehicle = await vehicleService.getVehicleByRouteCode(routeCode);

  if (!vehicle) {
    errorResponse(res, 404, 'Vehicle not found');
    return;
  }

  successResponseWithData(res, 'Vehicles data', vehicle);
});

const updateVehicle = wrap(async (req, res) => {
  const { id } = req.params;
  const vehicle = await vehicleService.updateVehicleById(id, req.body);

  successResponseWithData(
    res,
    'Vehicle has been updated successfuly',
    vehicle,
  );
});



const deleteVehicle = wrap(async (req, res) => {
  const { id } = req.params;
  const vehicle = await vehicleService.deleteVehicleById(id);

  successResponseWithData(
    res,
    'Vehicle has been deleted successfuly',
    vehicle,
  );
});

export default {
  create,
  list,
  getVehicle,
  getVehicleByRouteCode,
  updateVehicle,
  deleteVehicle,
};
