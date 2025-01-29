const prisma = require("../config/db");

const insertNotification = async (newNotificationData) => {
  const notification = await prisma.notification.create({
    data: {
      title: newNotificationData.title,
      description: newNotificationData.description,
      readStatus: newNotificationData.readStatus ?? false,
      category: newNotificationData.category,
      end_date: newNotificationData.end_date,
    },
  });
  return notification;
};

const editNotification = async (id, notificationData) => {
  const notification = await prisma.notification.update({
    where: {
      id,
    },
    data: {
      title: notificationData.title,
      description: notificationData.description,
      notificationDate: notificationData.notificationDate,
      readStatus: notificationData.readStatus,
      category: notificationData.category,
      end_date: notificationData.end_date,
    },
  });
  return notification;
};

const findNotifications = async () => {
  const notifications = await prisma.notification.findMany();
  return notifications;
};

const findNotificationById = async (id) => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return notification;
};

const deleteNotification = async (id) => {
  await prisma.notification.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  insertNotification,
  editNotification,
  findNotifications,
  findNotificationById,
  deleteNotification,
};
