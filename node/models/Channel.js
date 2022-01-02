const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Channel', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "Channel_name_key"
    },
    maker: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'Channel',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Channel_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "Channel_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
