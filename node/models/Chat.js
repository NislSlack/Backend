const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Chat', {
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
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Room',
        key: 'id'
      }
    },
    maker: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'name'
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Chat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Chat_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
