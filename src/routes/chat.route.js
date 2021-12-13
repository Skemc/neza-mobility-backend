import { Router } from 'express';
import chatController from '../controllers/chat.controller';
import validate from '../middlewares/validate';
import chatSchema from '../modules/chat.schema';
import auth from '../middlewares/auth';

const router = Router();

router.post(
    '/start',
    validate(chatSchema.create),
    chatController.create
);

router.get(
    '/',
    auth,
    chatController.getUserChats
);

router.get(
    '/:id',
    auth,
    validate(chatSchema.params),
    chatController.getChatById,
);

export default router;