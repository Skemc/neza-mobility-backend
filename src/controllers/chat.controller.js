import wrap from '../utils/wrapAsync';
import { chatService, userService } from '../services';
import {
  customResponseWithData,
  successResponseWithData,
  errorResponse,
} from '../utils/response';

const create = wrap(async (req, res) => {
  const { senderId, receiverId } = req.body;

  const user = await userService.getUserById(senderId);
  if (!user) {
    errorResponse(res, 404, 'Sender not found');
    return;
  }

  const isChatExist =
    user.chats.filter(
      (chat) =>
        chat.user1Id === senderId || chat.user2Id === senderId,
    ).length > 0;
  if (isChatExist) {
    errorResponse(
      res,
      400,
      'You already have conversation with this user',
    );
    return;
  }

  const receiver = await userService.getUserById(receiverId);
  if (!receiver) {
    errorResponse(res, 404, 'Receiver not found');
    return;
  }

  const chatToCreate = {
    user1Id: senderId,
    user2Id: receiverId,
  };
  const chat = await chatService.createChat(chatToCreate);

  user.chats.push(chat);
  receiver.chats.push(chat);
  await user.save();
  await receiver.save();

  customResponseWithData(res, 201, 'Chat created successfuly', chat);
});

const getUserChats = wrap(async (req, res) => {
  const userId = req.user.sub;
  const user = await userService.getUserById(userId);
  if (!user) {
    errorResponse(res, 404, 'User not found');
    return;
  }

  const chats = await chatService.getUserChats(userId);
  const resChats = chats.map((chat) => ({
    id: chat.id,
    messages: chat.messages,
    receiver:
      chat.user1Id.id === userId ? chat.user2Id : chat.user1Id,
  }));

  successResponseWithData(res, 'Chats data', resChats);
});

const getChatById = wrap(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.sub;
  const chat = await chatService.getChatById(id);

  if (!chat) {
    errorResponse(res, 404, 'Chat not found');
    return;
  }

  const resChat = {
    id: chat.id,
    messages: chat.messages,
    receiver:
      chat.user1Id.id === userId ? chat.user2Id : chat.user1Id,
  };

  successResponseWithData(res, 'Chat data', resChat);
});

export default {
  create,
  getUserChats,
  getChatById,
};
