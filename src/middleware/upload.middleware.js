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
const uploadFile = (req, res, next) => {
  upload.single("upload_file")(req, res, async (error) => {
    if (error) {
      return res.status(400).send(error.message);
    }

    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      req.body.upload_file = filePath;

      try {
        // Simpan ke database menggunakan Prisma
        const newEntry = await prisma.repository.create({
          data: {
            name_of_the_proposer: req.body.name_of_the_proposer,
            position: req.body.position,
            partner_agencies: req.body.partner_agencies,
            scope: req.body.scope,
            country: req.body.country,
            agency_category: req.body.agency_category,
            type: req.body.type,
            comment: req.body.comment || null,
            end_date: req.body.end_date || null,
            upload_file: filePath,
            status: req.body.status || "Aktif",
            agreement: req.body.agreement || "Agree",
            userId: req.body.userId,
          },
        });

        res.status(201).json({ message: "File uploaded and saved to database", data: newEntry });
      } catch (dbError) {
        console.error(dbError);
        res.status(500).send("Failed to save data to the database");
      }
    } else {
      res.status(400).send("No file uploaded");
    }
  });
};

module.exports = uploadFile;
