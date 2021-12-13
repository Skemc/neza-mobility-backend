import { Notification } from '../models';
import APIError from '../utils/APIError';
import { triggerNotification } from '../events/notification';

/**
 * Create a notification
 *
 * @param {*} notificationBody
 */
const createNotification = async (notificationBody) => {
  const notification = await Notification.create(notificationBody);

  triggerNotification(notificationBody);

  return notification;
};

/**
 * Get notification by id
 * @param {ObjectId} id
 * @returns {Promise<Notifiaction>}
 */
const getNotificationById = async (id) => Notification.findById(id);

/**
 * Update notification by id
 *
 * @param {ObjectId} notificationId
 * @param {Object} notificationBody
 * @returns {Promise<Notification>}
 */
const updateNotification = async (
  notificationId,
  notificationBody,
) => {
  const notification = await getNotificationById(notificationId);
  if (!notification) {
    throw new APIError(404, 'Notification not found');
  }

  Object.assign(notification, notificationBody);
  await notification.save();

  return notification;
};

export default {
  createNotification,
  updateNotification,
  getNotificationById,
};
