var express = require("express");
var router = express.Router();
const { User, sequelize } = require("../models");

/* GET home page. */
router.get("/", async (req, res, next) => {});

module.exports = router;
