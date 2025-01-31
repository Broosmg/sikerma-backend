const prisma = require("../config/db");

const findStatistics = async () => {
  const statistics = await prisma.statistic.findMany();
  return statistics;
};

const findStatisticById = async (id) => {
  const statistic = await prisma.statistic.findUnique({
    where: { id },
  });
  return statistic;
};

// Query untuk menghitung jumlah MoU, MoA, IA dari Repository
const countCollaborationTypes = async () => {
  const result = await prisma.repository.groupBy({
    by: ["type"],
    _count: { id: true },
  });

  return result.map((item) => ({
    collaborateType: item.type,
    count: item._count.id,
  }));
};

module.exports = {
  findStatistics,
  findStatisticById,
  countCollaborationTypes,
};
