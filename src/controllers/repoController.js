const express = require("express");
const { createRepository, getAllRepositories, getRepositoryById, editRepositoryById, deleteRepositoryById } = require("../service/repoService");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/repository", async (req, res) => {
  try {
    const newRepositoryData = req.body;
    const repository = await createRepository(newRepositoryData);

    res.status(201).send({
      data: repository,
      message: "Repository created successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/repository", authenticateToken, async (req, res) => {
  try {
    const repositories = await getAllRepositories();

    res.status(200).send({
      data: repositories,
      message: "Repositories retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/repository/:id", authenticateToken, async (req, res) => {
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

router.patch("/repository/:id", authenticateToken, async (req, res) => {
  try {
    const repositoryId = Number(req.params.id);
    const repositoryData = req.body;
    const repository = await editRepositoryById(repositoryId, repositoryData);

    res.status(200).send({
      data: repository,
      message: "repository profile updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/repository/:id", authenticateToken, async (req, res) => {
  try {
    const repositoryId = Number(req.params.id);
    await deleteRepositoryById(repositoryId);

    res.status(200).send("Repository deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
