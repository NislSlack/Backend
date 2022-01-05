var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", function (req, res, next) {
  res.send({ userId: 0 });
});

module.exports = router;
