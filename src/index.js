const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userController = require("./controllers/userController");
const repoController = require("./controllers/repoController");
const notifController = require("./controllers/notifController");
// const submissionController = require("./controllers/submissionController");
// const mouController = require("./controllers/mouController");
// const moaController = require("./controllers/moaController");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userController);
app.use("/", repoController);
app.use("/", notifController);
// app.use("/submission", submissionController);
// app.use("/mousubmission", mouController);
// app.use("moasubmission", moaController);

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
