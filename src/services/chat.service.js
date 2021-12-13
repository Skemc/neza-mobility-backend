import { Chat } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a trip
 *
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
const createChat = async (chatBody) => {
  const chat = await Chat.create(chatBody);
  return chat;
};

/**
 * Query for chats
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryChats = async (filter, options) => {
//   const chats = await Chat.paginate(filter, options);
//   return chats;
// };

/**
 * Get chat by id
 * @param {ObjectId} id
 * @returns {Promise<chat>}
 */
const getChatById = async (id) =>
  Chat.findById(id)
    .populate('user1Id')
    .populate('user2Id')
    .populate({
      path: 'messages',
      populate: {
        path: 'userId',
        model: 'User',
      },
    });

/**
 * Get chats
 * @param {string} userId
 * @returns {Promise<chats>}
 */
const getUserChats = async (userId) =>
  Chat.find({ $or: [{ user1Id: userId }, { user2Id: userId }] })
    .sort('-updatedAt')
    .populate('user1Id')
    .populate('user2Id')
    .populate({
      path: 'messages',
      populate: {
        path: 'userId',
        model: 'User',
      },
    });

/**
 * Update chat by id
 * @param {ObjectId} chatId
 * @param {Object} updateBody
 * @returns {Promise<Trip>}
 */
const updateChatById = async (chatId, updateBody) => {
  const chat = await getChatById(chatId);

  Object.assign(chat, updateBody);
  await chat.save();

  return chat;
};

export default {
  createChat,
  getChatById,
  getUserChats,
  updateChatById,
};
