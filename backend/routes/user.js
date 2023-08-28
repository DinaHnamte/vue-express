const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const body = req.body;
  console.log(body);
  res.send("Registration data recieved");
});

module.exports = router;
