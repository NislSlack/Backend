const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Room', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Channel',
        key: 'name'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Room',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Room_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
