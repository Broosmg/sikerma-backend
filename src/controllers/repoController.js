const express = require("express");
const { createRepository, getAllRepositories, getRepositoryById, editRepositoryById, deleteRepositoryById } = require("../service/repoService");
const { authenticateToken } = require("../middleware/auth.middleware");
const uploadFile = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/", authenticateToken, uploadFile, async (req, res) => {
  try {
    const userId = req.user.id;
    const newRepositoryData = req.body;
    newRepositoryData.userId = userId;
    const repository = await createRepository(newRepositoryData);

    res.status(201).send({
      data: repository,
      message: "Repository created successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const repositories = await getAllRepositories(userId);

    res.status(200).send({
      data: repositories,
      message: "Repositories retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const repositoryById = req.params.id;
    const repository = await getRepositoryById(repositoryById);

    res.status(200).send({
      data: repository,
      message: "Repository retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const repositoryId = Number(req.params.id);
    const repositoryData = req.body;
    const repository = await editRepositoryById(repositoryId, repositoryData);

    res.status(200).send({
      data: repository,
      message: "repository Edit updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const repositoryId = Number(req.params.id);
    await deleteRepositoryById(repositoryId);

    res.status(200).send("Repository deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
