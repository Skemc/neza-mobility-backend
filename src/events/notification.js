import logger from '../config/logger';

let io;

const initEvent = (socketIo) => {
  io = socketIo;
};

const triggerNotification = (notification) => {
  logger.info(
    `Notification ${JSON.stringify(notification)}!`,
  )

  if (notification.owner === 'driver') {
    io.to(notification.driver).emit(notification.type, notification);
  } else {
    io.to(notification.client.id).emit(notification.type, notification);
  }
};

export { initEvent, triggerNotification };
