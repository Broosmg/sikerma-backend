const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const userController = require("./controllers/userController");
const repoController = require("./controllers/repoController");
const extensController = require("./controllers/extensController");
const notifController = require("./controllers/notifController");
const tempController = require("./controllers/tempController");
const addenController = require("./controllers/addenController");
const statController = require("./controllers/statController");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/users", userController);
app.use("/repository", repoController);
app.use("/", extensController);
app.use("/", notifController);
app.use("/", tempController);
app.use("/", addenController);
app.use("/statistics", statController);

app.get("/", (req, res) => {
  res.send({
    teamName: "Kie Raha",
    project: "Sikerma Web",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
