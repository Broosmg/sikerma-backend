const { findStatistics, findStatisticById, countCollaborationTypes } = require("../repository/statRepository");

const getAllStatistics = async () => {
  const statistics = await findStatistics();
  return statistics;
};

const getStatisticById = async (id) => {
  const statistic = await findStatisticById(id);

  if (!statistic) {
    throw new Error("Statistic not found.");
  }

  return statistic;
};

// Service untuk mengambil jumlah MoU, MoA, IA terbaru
const getCollaborationStatistics = async () => {
  return await countCollaborationTypes();
};

module.exports = {
  getAllStatistics,
  getStatisticById,
  getCollaborationStatistics,
};
