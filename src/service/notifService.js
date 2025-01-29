const yup = require("yup");
const { insertNotification, editNotification, findNotifications, findNotificationById, deleteNotification } = require("../repository/notifRepository");
const { format } = require("date-fns");

const notificationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  readStatus: yup.boolean().default(false),
  category: yup.string().required("Category is required"),
  end_date: yup.string(),
});

const createNotification = async (newNotificationData) => {
  await notificationSchema.validate(newNotificationData, { abortEarly: false });

  if (newNotificationData.end_date) {
    try {
      // Konversi end_date menjadi objek Date
      const parsedDate = new Date(newNotificationData.end_date);

      if (!isNaN(parsedDate.getTime())) {
        // Format hasil menjadi DD-MM-YYYY tanpa locale
        newNotificationData.end_date = format(parsedDate, "mm-dd-yyyy");
      } else {
        throw new Error("Invalid end_date format");
      }
    } catch (error) {
      throw new Error("Invalid end_date format");
    }
  }

  const notification = await insertNotification(newNotificationData);
  return notification;
};

const getAllNotifications = async () => {
  return await findNotifications();
};

const getNotificationById = async (id) => {
  const notification = await findNotificationById(id);
  if (!notification) {
    throw new Error("Notification not found.");
  }
  return notification;
};

const editNotificationById = async (id, notificationData) => {
  await getNotificationById(id);
  return await editNotification(id, notificationData);
};

const deleteNotificationById = async (id) => {
  await getNotificationById(id);
  await deleteNotification(id);
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  editNotificationById,
  deleteNotificationById,
};
