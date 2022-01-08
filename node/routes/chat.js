var express = require("express");
const { Chat, Room } = require("../models");
const { packPayloadRes } = require("../lib/response");
var router = express.Router();

/* GET users listing. */
router.post("/get", async function (req, res, next) {
  try {
    const room_id = await Room.findOne({
      attributes: ["id"],
      where: {
        channel_name: req.body.channel_name,
        name: req.body.room_name,
      },
    });
    if (!room_id) {
      return packPayloadRes(res, 2, "방이 존재하지 않음");
    }
    const exChat = await Chat.findAll({
      where: {
        channel_name: req.body.channel_name,
        room_id: room_id.dataValues.id,
      },
    });
    if (!exChat) {
      return packPayloadRes(res, 2, "채팅 정보없음");
    }

    return packPayloadRes(res, 0, "채팅 정보 조회 성공", exChat);
  } catch (err) {
    console.log(err);
    return packPayloadRes(res, 1, "기타 오류", err);
  }
});

module.exports = router;
