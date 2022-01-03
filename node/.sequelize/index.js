const { sequelize } = require("../models");

const DBinit = async () => {
  try {
    await sequelize.sync();
    console.log("DB Connect Complete!");
  } catch (e) {
    console.error(`DB Connect Fail ${e}`);
  }
};

module.exports = DBinit;
