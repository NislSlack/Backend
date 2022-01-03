var express = require("express");
var router = express.Router();
const { User, sequelize } = require("../models");

/* GET home page. */
router.get("/", async (req, res, next) => {
  // const exUser = await User.findOne({
  //   where: {
  //     id: 1,
  //   },
  // });
  // res.send(exUser);
});

module.exports = router;
