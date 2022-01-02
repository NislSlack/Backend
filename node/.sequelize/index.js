const { sequelize } = require('../models');

const DBinit = async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.error(`DB Connect Fail ${e}`);
  }
  console.log('DB Connect Complete!');
};

module.exports = DBinit;
