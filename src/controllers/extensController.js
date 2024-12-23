const express = require("express");
const { createExtension, getAllExtentions, getExtensionById, editExtensionById, deleteExtensionById } = require("../service/extensService");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/extension", async (req, res) => {
  try {
    const newExtensionData = req.body;
    const extension = await createExtension(newExtensionData);

    res.status(201).send({
      data: extension,
      message: "Extension created successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/extension", authenticateToken, async (req, res) => {
  try {
    const extensions = await getAllExtentions();

    res.status(200).send({
      data: extensions,
      message: "Extensions retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/extension/:id", authenticateToken, async (req, res) => {
  try {
    const extensionById = req.params.id;
    const extension = await getExtensionById(extensionById);

    res.status(200).send({
      data: extension,
      message: "Extension retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/extension/:id", authenticateToken, async (req, res) => {
  try {
    const extensionId = Number(req.params.id);
    const extensionData = req.body;
    const extension = await editExtensionById(extensionId, extensionData);

    res.status(200).send({
      data: extension,
      message: "Extension edit updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/extension/:id", authenticateToken, async (req, res) => {
  try {
    const extensionId = Number(req.params.id);
    await deleteExtensionById(extensionId);

    res.status(200).send("Extension deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
