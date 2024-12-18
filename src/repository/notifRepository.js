const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new notification
const createNotification = async (req, res) => {
  try {
    const { title, description, category, notificationDate } = req.body;

    const notification = await prisma.notification.create({
      data: {
        title,
        description,
        category,
        notificationDate: new Date(notificationDate), // Pastikan format tanggal benar
      },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Get notification by ID
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notification" });
  }
};

// Update notification by ID
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, notificationDate, readStatus } = req.body;

    const updatedNotification = await prisma.notification.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        category,
        notificationDate: new Date(notificationDate), // Pastikan format tanggal benar
        readStatus: readStatus || false, // Jika tidak ada, default tetap false
      },
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

// Delete notification by ID
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.notification.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
