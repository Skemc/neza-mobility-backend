import wrap from '../utils/wrapAsync';
import { companyService } from '../services';
import {
    customResponseWithData,
    successResponseWithData,
    errorResponse,
} from '../utils/response';

const create = wrap(async (req, res) => {
    const company = await companyService.createCompany(req.body);

    customResponseWithData(
        res,
        201,
        'Company has been created successfuly',
        company,
    );
});

const list = wrap(async (req, res) => {
    const company = await companyService.getCompanies();

    if (!company.length) {
        errorResponse(res, 404, 'No Company found');
        return;
    }

    successResponseWithData(
        res,
        'Company data',
        company,
    );
});

const updateCompany = wrap(async (req, res) => {
    const { id } = req.params;
    const company = await companyService.updateVehicleById(id, req.body);

    successResponseWithData(
        res,
        'Company has been updated successfuly',
        company,
    );
});

export default {
    create,
    list,
    updateCompany,
};