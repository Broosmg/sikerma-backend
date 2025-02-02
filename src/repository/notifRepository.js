const prisma = require("../config/db");

const insertNotification = async (newNotificationData) => {
  const notification = await prisma.notification.create({
    data: {
      title: newNotificationData.title,
      description: newNotificationData.description,
      // Gunakan string "True" atau "False" sesuai dengan enum
      readStatus: newNotificationData.readStatus ? "True" : "False",
      category: newNotificationData.category,
      end_date: newNotificationData.end_date,
      schedule: newNotificationData.schedule,
      userId: newNotificationData.userId,
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
      readStatus: notificationData.readStatus ? "True" : "False",
      category: notificationData.category,
      end_date: notificationData.end_date,
      schedule: notificationData.schedule,
      userId: notificationData.userId,
    },
  });
  return notification;
};

const findNotifications = async (userId) => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId, // Filter berdasarkan userId
    },
    include: {
      user: true, // Menyertakan data user yang terkait
    },
  });

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
