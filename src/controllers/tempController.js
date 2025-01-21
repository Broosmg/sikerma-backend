const express = require("express");
const { createTemplate, getAllTemplates, getTemplateById, editTemplateById, deleteTemplateById } = require("../service/tempService");
const { authenticateToken } = require("../middleware/auth.middleware");
const uploadFile = require("../middleware/uploadTemp.middleware");

const router = express.Router();

router.post("/template", uploadFile, async (req, res) => {
  try {
    const newTemplateData = req.body;
    const template = await createTemplate(newTemplateData);

    res.status(201).send({
      data: template,
      message: "Template created successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/template", authenticateToken, async (req, res) => {
  try {
    const templates = await getAllTemplates();

    res.status(200).send({
      data: templates,
      message: "Templates retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/template/:id", authenticateToken, async (req, res) => {
  try {
    const templateById = req.params.id;
    const template = await getTemplateById(templateById);

    res.status(200).send({
      data: template,
      message: "Template retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/template/:id", authenticateToken, async (req, res) => {
  try {
    const templateId = Number(req.params.id);
    const templateData = req.body;
    const template = await editTemplateById(templateId, templateData);

    res.status(200).send({
      data: template,
      message: "Template Edit updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/template/:id", authenticateToken, async (req, res) => {
  try {
    const templateId = Number(req.params.id);
    await deleteTemplateById(templateId);

    res.status(200).send("Template deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
