const cron = require("node-cron");
const { sendNotificationToUser } = require("./notificationService"); // Asumsikan ada service untuk mengirim notifikasi
const { findNotifications } = require("./repository/notifRepository");

const scheduleNotifications = () => {
  // Menjadwalkan untuk setiap menit
  cron.schedule("* * * * *", async () => {
    const notifications = await findNotifications();
    const currentTime = new Date().toISOString(); // Waktu sekarang dalam format ISO

    notifications.forEach((notification) => {
      if (notification.schedule && notification.schedule <= currentTime && !notification.readStatus) {
        // Kirim notifikasi berdasarkan jadwal dan status read
        sendNotificationToUser(notification); // Fungsi untuk mengirim notifikasi ke pengguna
      }
    });
  });
};

scheduleNotifications();
