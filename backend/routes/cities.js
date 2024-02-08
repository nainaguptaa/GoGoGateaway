var express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("THIS IS THE CITIES ROUTE");
});

module.exports = router;