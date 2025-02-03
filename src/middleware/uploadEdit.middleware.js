const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    cb(null, true);
  } else {
    cb(new Error("Only DOCX and PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Middleware untuk upload file
const uploadFileEdit = (req, res, next) => {
  upload.single("upload_file")(req, res, async (error) => {
    if (error) {
      return res.status(400).send(error.message);
    }

    try {
      const repositoryId = req.params.id; // ID repository yang ingin diupdate
      const existingRepository = await prisma.repository.findUnique({
        where: { id: parseInt(repositoryId) },
      });

      if (!existingRepository) {
        return res.status(404).send("Repository not found");
      }

      const updatedData = {
        name_of_the_proposer: req.body.name_of_the_proposer,
        position: req.body.position,
        partner_agencies: req.body.partner_agencies,
        scope: req.body.scope,
        country: req.body.country,
        agency_category: req.body.agency_category,
        type: req.body.type,
        comment: req.body.comment || null,
        end_date: req.body.end_date || null,
        status: req.body.status || "Aktif",
        agreement: req.body.agreement || "Agree",
      };

      // Jika ada file baru yang diupload
      if (req.file) {
        const filePath = `/uploads/${req.file.filename}`;
        // Hapus file lama jika ada
        const oldFilePath = path.join(__dirname, "..", existingRepository.upload_file);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
        updatedData.upload_file = filePath;
      } else {
        updatedData.upload_file = existingRepository.upload_file; // Tetap menggunakan file lama jika tidak ada file baru
      }

      // Update repository di database
      const updatedRepository = await prisma.repository.update({
        where: { id: parseInt(repositoryId) },
        data: updatedData,
      });

      res.status(200).json({ message: "Repository updated successfully", data: updatedRepository });
    } catch (dbError) {
      console.error(dbError);
      res.status(500).send("Failed to update data in the database");
    }
  });
};

module.exports = uploadFileEdit;
