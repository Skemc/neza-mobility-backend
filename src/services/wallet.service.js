import { Wallet } from '../models';
import APIError from '../utils/APIError';

//  * @param {ObjectId} id
/**
 * Create a user
 * @param {Object} walletBody
 * @returns {Promise<Wallet>}
 */
const userDeposit = async ( walletBody) => {
  const newbalance = await Wallet.create(walletBody);
  return newbalance;
};


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryUsers = async (filter, options) => {
//   const users = await User.paginate(filter, options);
//   return users;
// };

/**
 * Get user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => Wallet.findById(userId);


/**
 * Get user by email
 * @@param {ObjectId} id
 * @returns {Promise<Wallet>}
 */
const getUserBalance = async (id) => 
  Wallet.findOne({ user: id })
    .populate('user')
;

/**
 * Update user amount deposit by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Wallet>}
 */
const updateUserBalanceDepositById = async (userId, updateBody) => {
  const user = await getUserBalance(userId);
  // const { email, userName } = updateBody;
  const newBody = {...user, amount: user.amount + updateBody.amount };
  if (!user) {
    throw new APIError(404, 'User not found');
  }

  Object.assign(user, newBody);
  await user.save();
  return user;
};

/**
 * Update user balance credit by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Wallet>}
 */
const updateUserBalanceCreditById = async (userId, updateBody) => {
  const user = await getUserBalance(userId);
  // const { email, userName } = updateBody;
  const newBody = {...user, amount: user.amount - updateBody.amount };
  if (!user) {
    throw new APIError(404, 'User not found');
  }
  if (user.amount < updateBody.amount) {
    throw new APIError(404, 'You do not have sufficient funds to perform this operation. Recharge to proceed.');
  }
  // if (!user) {
  //   throw new APIError(404, 'User not found');
  // }

  Object.assign(user, newBody);
  await user.save();
  return user;
};

export default {
  userDeposit,
  getUserById,
  getUserBalance,
  updateUserBalanceDepositById,
  updateUserBalanceCreditById,
};
