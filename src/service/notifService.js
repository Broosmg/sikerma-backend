const yup = require("yup");
const { insertNotification, editNotification, findNotifications, findNotificationById, deleteNotification } = require("../repository/notifRepository");
const { format } = require("date-fns");

const scheduleSchema = yup.string().matches(/^(0?[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, "Invalid schedule format. Please use HH:MM");

const notificationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  readStatus: yup.boolean().default(false),
  category: yup.string().required("Category is required"),
  end_date: yup.string(),
  schedule: scheduleSchema,
  userId: yup.string(),
});

const createNotification = async (newNotificationData) => {
  await notificationSchema.validate(newNotificationData, { abortEarly: false });

  // Konversi end_date dan schedule jika diperlukan
  if (newNotificationData.schedule) {
    const [hours, minutes] = newNotificationData.schedule.split(":");
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0); // Menetapkan waktu yang dijadwalkan
    newNotificationData.schedule = currentDate.toISOString(); // Menyimpan dalam format ISO
  }

  if (newNotificationData.end_date) {
    try {
      const parsedDate = new Date(newNotificationData.end_date);
      if (!isNaN(parsedDate.getTime())) {
        newNotificationData.end_date = format(parsedDate, "dd-MM-yyyy");
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

const sendNotificationToUser = (notification) => {
  // Kirim notifikasi ke pengguna sesuai dengan notifikasi yang dijadwalkan
  console.log(`Sending notification: ${notification.title} to user...`);
  // Logika pengiriman notifikasi ke pengguna
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  editNotificationById,
  deleteNotificationById,
  sendNotificationToUser,
};
