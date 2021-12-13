import { Company } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a Company
 *
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */

const createCompany = async (companyBody) => {
    const {
        name,
    } = companyBody;

    if (await Company.isCompanyRegistered(name)) {
        throw new APIError(409, 'Plate number already used');
    }

    const company = await Company.create(companyBody);
    return company;
};

/**
 * Get Company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) =>
    Company.findById(id);

/**
* Get all company
* @param {ObjectId} id
* @returns {Promise<company>}
*/
const getCompanies = async () => Company.find();

export default {
    createCompany,
    getCompanies,
    getCompanyById,
};