import { Router } from 'express';
import userController from '../controllers/user.controller';
import validate from '../middlewares/validate';
import userSchema from '../modules/user.schema';

const router = Router();

// router.get('/', validate(userSchema.register), userController.list);
// router.get('/:id', validate(userSchema.clientRegister), userController.list);
router.patch(
  '/:id',
  validate(userSchema.clientUpdate),
  userController.update,
);

export default router;
