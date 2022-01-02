const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChannelMember', {
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
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'ChannelMember',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ChannelMember_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
