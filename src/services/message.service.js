import { Message, Chat } from '../models';
import APIError from '../utils/APIError';

/**
 * Create a message
 *
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */
const createMessage = async (messageBody) => {
  const { chatId, receiverId, ...rest } = messageBody;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new APIError(404, 'Chat not found');
  }
  // if (chat.user1Id !== receiverId || chat.user2Id !== receiverId) {
  //   throw new APIError(304, 'Invalid receiverId');
  // }

  const savedMessage = await Message.create(rest);
  chat.messages.push(savedMessage);
  await chat.save();

  const message = await chat
    .populate('user1Id')
    .populate('user2Id')
    .populate({
      path: 'messages',
      populate: {
        path: 'userId',
        model: 'User',
      },
    })
    .execPopulate();
  const resChat = {
    id: message.id,
    messages: message.messages,
    receiver:
      message.user1Id.id === receiverId
        ? message.user1Id
        : message.user2Id,
  };
  return resChat;
};

export default {
  createMessage,
};
