var DataTypes = require("sequelize").DataTypes;
var _Channel = require("./Channel");
var _ChannelMember = require("./ChannelMember");
var _Chat = require("./Chat");
var _Room = require("./Room");
var _User = require("./User");

function initModels(sequelize) {
  var Channel = _Channel(sequelize, DataTypes);
  var ChannelMember = _ChannelMember(sequelize, DataTypes);
  var Chat = _Chat(sequelize, DataTypes);
  var Room = _Room(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  ChannelMember.belongsTo(Channel, { as: "channel_name_Channel", foreignKey: "channel_name"});
  Channel.hasMany(ChannelMember, { as: "ChannelMembers", foreignKey: "channel_name"});
  Chat.belongsTo(Channel, { as: "channel_name_Channel", foreignKey: "channel_name"});
  Channel.hasMany(Chat, { as: "Chats", foreignKey: "channel_name"});
  Room.belongsTo(Channel, { as: "channel_name_Channel", foreignKey: "channel_name"});
  Channel.hasMany(Room, { as: "Rooms", foreignKey: "channel_name"});
  Chat.belongsTo(Room, { as: "room", foreignKey: "room_id"});
  Room.hasMany(Chat, { as: "Chats", foreignKey: "room_id"});
  Channel.belongsTo(User, { as: "maker_User", foreignKey: "maker"});
  User.hasMany(Channel, { as: "Channels", foreignKey: "maker"});
  ChannelMember.belongsTo(User, { as: "user_name_User", foreignKey: "user_name"});
  User.hasMany(ChannelMember, { as: "ChannelMembers", foreignKey: "user_name"});
  Chat.belongsTo(User, { as: "maker_User", foreignKey: "maker"});
  User.hasMany(Chat, { as: "Chats", foreignKey: "maker"});

  return {
    Channel,
    ChannelMember,
    Chat,
    Room,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
