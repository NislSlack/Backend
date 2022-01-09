const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "User_name_key"
    }
  }, {
    sequelize,
    tableName: 'User',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "User_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "User_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
