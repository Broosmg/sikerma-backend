const express = require("express");
const { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } = require("../service/notifService");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

// Route untuk membuat notifikasi baru
router.post("/notifications", async (req, res) => {
  try {
    const newNotificationData = req.body;
    const notification = await createNotification(newNotificationData);

    res.status(201).send({
      data: notification,
      message: "Notification created successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route untuk mendapatkan semua notifikasi
router.get("/notifications", authenticateToken, async (req, res) => {
  try {
    const notifications = await getAllNotifications();

    res.status(200).send({
      data: notifications,
      message: "Notifications retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route untuk mendapatkan notifikasi berdasarkan ID
router.get("/notifications/:id", authenticateToken, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await getNotificationById(notificationId);

    res.status(200).send({
      data: notification,
      message: "Notification retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route untuk memperbarui notifikasi berdasarkan ID
router.patch("/notifications/:id", authenticateToken, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notificationData = req.body;
    const updatedNotification = await updateNotification(notificationId, notificationData);

    res.status(200).send({
      data: updatedNotification,
      message: "Notification updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route untuk menghapus notifikasi berdasarkan ID
router.delete("/notifications/:id", authenticateToken, async (req, res) => {
  try {
    const notificationId = req.params.id;
    await deleteNotification(notificationId);

    res.status(200).send("Notification deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
