import wrap from '../utils/wrapAsync';
import { walletService } from '../services';
import {
  customResponseWithData,
  successResponseWithData,
  errorResponse,
  customResponse,
} from '../utils/response';

// import Mailer from '../services/mail/Mailer';


const deposit = wrap(async (req, res) => {
  const amount = await walletService.userDeposit(req.body);

  customResponseWithData(
    res,
    201,
    'Amount has been deposited successfuly',
    amount,
  );
});

const getUserBalance = wrap(async (req, res) => {
  const { userId } = req.params;
  const userBalance = await walletService.getUserBalance(userId);

  if (!userBalance) {
    errorResponse(res, 404, 'User Balance not found');
    return;
  }

  successResponseWithData(res, 'User Balance data', userBalance);
});

const updateUserBalanceDeposit = wrap(async (req, res) => {
  const { id } = req.params;
  const Balance = await walletService.updateUserBalanceDepositById(id, req.body);

  successResponseWithData(
    res,
    'Deposit has been completed successfuly',
    Balance,
  );
});

const updateUserBalanceCredit = wrap(async (req, res) => {
  const { id } = req.params;
  const Balance = await walletService.updateUserBalanceCreditById(id, req.body);

  successResponseWithData(
    res,
    'You have successfuly paid',
    Balance,
  );
});





export default {
  deposit,
  getUserBalance,
  updateUserBalanceDeposit,
  updateUserBalanceCredit,
  // forgotPassword,
  // resetPassword,
};
