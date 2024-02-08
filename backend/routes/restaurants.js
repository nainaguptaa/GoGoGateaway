var express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("THIS IS THE Resturants ROUTE");
});

module.exports = router;