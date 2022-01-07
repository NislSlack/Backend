const express = require("express");
const { ChannelMember, Room, sequelize } = require("../models");
const { packPayloadRes } = require("../lib/response");
const router = express.Router();

/* POST users listing. */
router.post("/", async (req, res, next) => {
  const regiRoom = await sequelize.transaction();
  try {
    const exUser = await ChannelMember.findOne({
      where: {
        channel_name: req.body.channel_name,
        user_name: req.body.user_name,
      },
    });
    if (!exUser) {
      return packPayloadRes(res, 2, "해당 이름에 유저가 채널에 없음");
    }

    const exRoom = await Room.findOne({
      where: {
        channel_name: req.body.channel_name,
        name: req.body.room_name,
      },
    });
    if (exRoom) {
      return packPayloadRes(res, 2, "해당 이름에 방의 정보있음");
    }

    // 채널 생성
    await Room.create({
      channel_name: req.body.channel_name,
      name: req.body.room_name,
    });
    await regiRoom.commit();
    return packPayloadRes(res, 0, "방 등록 성공");
  } catch (err) {
    await regiRoom.rollback();
    return packPayloadRes(res, 1, "기타 오류", err);
  }
});

router.post("/get", async (req, res, next) => {
  try {
    const exRoom = await Room.findAll({
      where: {
        channel_name: req.body.channel_name,
      },
    });
    if (!exRoom) {
      return packPayloadRes(res, 2, "유저가 포함된 방 정보없음");
    }

    return packPayloadRes(res, 0, "방 정보 조회 성공", exRoom);
  } catch (err) {
    console.log(err);
    return packPayloadRes(res, 1, "기타 오류", err);
  }
});

module.exports = router;
