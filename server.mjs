import express from "express";

const APP = express();
const PORT = 9090;

APP.use(express.static("public"));

APP.get("/", async (req, res) => {
  res.sendStatus(200);
});

APP.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
