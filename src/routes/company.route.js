import { Router } from 'express';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';
import companyController from '../controllers/company.controller';
import companySchema from '../modules/company.schema';


const router = Router();

router.post(
    '/register',
    auth,
    validate(companySchema.create),
    companyController.create,
);

router.patch(
    '/:code',
    validate(companySchema.update),
    companyController.updateCompany,
);

router.get(
    '/',
    companyController.list,
);

export default router;
