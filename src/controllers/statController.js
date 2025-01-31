const express = require("express");
const { getAllStatistics, getStatisticById, getCollaborationStatistics } = require("../service/statService");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

// Endpoint untuk mengambil seluruh data statistik dari tabel Statistic
router.get("/", authenticateToken, async (req, res) => {
  try {
    const statistics = await getAllStatistics();
    res.status(200).send({
      data: statistics,
      message: "Statistics retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint untuk mengambil data statistik berdasarkan ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const statisticId = parseInt(req.params.id);
    const statistic = await getStatisticById(statisticId);

    res.status(200).send({
      data: statistic,
      message: "Statistic retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint baru untuk menghitung jumlah MoU, MoA, IA langsung dari Repository
router.get("/realtime/:id", authenticateToken, async (req, res) => {
  try {
    const statistics = await getCollaborationStatistics();
    res.status(200).send({
      data: statistics,
      message: "Real-time statistics retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
