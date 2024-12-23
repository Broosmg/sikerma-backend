const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userController = require("./controllers/userController");
const repoController = require("./controllers/repoController");
const extensController = require("./controllers/extensController");
const notifController = require("./controllers/notifController");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userController);
app.use("/", repoController);
app.use("/", extensController);
app.use("/", notifController);

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
