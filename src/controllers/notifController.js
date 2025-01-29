const express = require("express");
const { createNotification, getAllNotifications, getNotificationById, editNotificationById, deleteNotificationById } = require("../service/notifService");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/notification", authenticateToken, async (req, res) => {
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

router.get("/notification", authenticateToken, async (req, res) => {
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

router.get("/notification/:id", authenticateToken, async (req, res) => {
  try {
    const notificationId = Number(req.params.id);
    const notification = await getNotificationById(notificationId);
    res.status(200).send({
      data: notification,
      message: "Notification retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/notification/:id", authenticateToken, async (req, res) => {
  try {
    const notificationId = Number(req.params.id);
    const notificationData = req.body;
    const notification = await editNotificationById(notificationId, notificationData);
    res.status(200).send({
      data: notification,
      message: "Notification updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/notification/:id", authenticateToken, async (req, res) => {
  try {
    const notificationId = Number(req.params.id);
    await deleteNotificationById(notificationId);
    res.status(200).send("Notification deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
