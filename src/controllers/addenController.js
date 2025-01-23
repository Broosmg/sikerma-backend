const express = require("express");
const { createAddendum, getAllAddenda, getAddendumById, editAddendumById, deleteAddendumById } = require("../service/addenService");
const { authenticateToken } = require("../middleware/auth.middleware");
const uploadFile = require("../middleware/uploadAdden.middleware");

const router = express.Router();

router.post("/addendum", uploadFile, async (req, res) => {
  try {
    const newAddendumData = req.body;
    const addendum = await createAddendum(newAddendumData);

    res.status(201).send({
      data: addendum,
      message: "Addendum created successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/addendum", authenticateToken, async (req, res) => {
  try {
    const addendum = await getAllAddenda();

    res.status(200).send({
      data: addendum,
      message: "Addenda retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/addendum/:id", authenticateToken, async (req, res) => {
  try {
    const addendumById = req.params.id;
    const addendum = await getAddendumById(addendumById);

    res.status(200).send({
      data: addendum,
      message: "Addendum retrieved successfully.",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/addendum/:id", authenticateToken, async (req, res) => {
  try {
    const addendumId = Number(req.params.id);
    const addendumData = req.body;
    const addendum = await editAddendumById(addendumId, addendumData);

    res.status(200).send({
      data: addendum,
      message: "Addendum edit updated successfully.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/addendum/:id", authenticateToken, async (req, res) => {
  try {
    const addendumId = Number(req.params.id);
    await deleteAddendumById(addendumId);

    res.status(200).send("Addendum deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
