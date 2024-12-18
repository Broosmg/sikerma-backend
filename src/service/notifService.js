const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to create a new notification
const createNotification = async (data) => {
  const { title, description, category, notificationDate } = data;

  // Validasi jika diperlukan
  if (!title || !description || !category || !notificationDate) {
    throw new Error("Missing required fields");
  }

  const newNotification = await prisma.notification.create({
    data: {
      title,
      description,
      category,
      notificationDate: new Date(notificationDate), // Pastikan format tanggal benar
    },
  });

  return newNotification;
};

// Function to get all notifications
const getAllNotifications = async () => {
  const notifications = await prisma.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
};

// Function to get a notification by ID
const getNotificationById = async (id) => {
  const notification = await prisma.notification.findUnique({
    where: { id: Number(id) },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};

// Function to update a notification by ID
const updateNotification = async (id, data) => {
  const { title, description, category, notificationDate, readStatus } = data;

  // Validasi jika diperlukan
  if (!title || !description || !category || !notificationDate) {
    throw new Error("Missing required fields");
  }

  const updatedNotification = await prisma.notification.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      category,
      notificationDate: new Date(notificationDate), // Pastikan format tanggal benar
      readStatus: readStatus || false, // Default ke false jika tidak disediakan
    },
  });

  return updatedNotification;
};

// Function to delete a notification by ID
const deleteNotification = async (id) => {
  const deletedNotification = await prisma.notification.delete({
    where: { id: Number(id) },
  });

  return deletedNotification;
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
