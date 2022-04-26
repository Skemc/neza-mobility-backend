import { Router } from 'express';
import walletController from '../controllers/wallet.controller';
import validate from '../middlewares/validate';
import walletSchema from '../modules/wallet.schema';

const router = Router();

// router.get('/', validate(userSchema.register), userController.list);
// router.get('/:id', validate(userSchema.clientRegister), userController.list);
router.post(
  '/deposit',
  validate(walletSchema.userDeposit),
  walletController.deposit,
);

router.get(
  '/:userId',
  validate(walletSchema.params),
  walletController.getUserBalance,
);

router.patch(
  '/deposit/:id',
  validate(walletSchema.update),
  walletController.updateUserBalanceDeposit,
);

router.patch(
  '/credit/:id',
  validate(walletSchema.update),
  walletController.updateUserBalanceCredit,
);

export default router;
