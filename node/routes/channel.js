const express = require("express");
const h = require("../lib/header");
const { Channel, ChannelMember, User, sequlize } = require("../models");
const { packPayloadRes } = require("../lib/response");
const router = express.Router();

/* POST users listing. */
router.post("/", async (req, res, next) => {
  const regiChannel = await sequlize.transaction();
  try {
    const exChannel = await Channel.findOne({
      where: {
        name: req.body.channel_name,
      },
    });

    if (exChannel) {
      return packPayloadRes(
        res,
        h.resCode.cltchannel01.existChannel,
        h.msgType.cltChannel01Res,
        "해당 이름에 채널 정보있음"
      );
    }

    const exUser = await User.findOne({
      where: {
        name: req.body.user_name,
      },
    });

    if (!exUser) {
      return packPayloadRes(
        res,
        h.resCode.cltchannel01.notExistUser,
        h.msgType.cltChannel01Res,
        "해당 이름에 유저 정보없음"
      );
    }

    // 채널 생성
    await Channel.create({
      name: req.body.channel_name,
      maker: req.body.user_name,
    });

    // 채널에 가입
    await ChannelMember.create({
      channel_name: req.body.channel_name,
      user_name: req.body.user_name,
    });

    await regiChannel.commit();
    return packPayloadRes(
      res,
      h.resCode.cltchannel01.OK,
      h.msgType.cltChannel01Res,
      "채널 등록 성공"
    );
  } catch (err) {
    await regiChannel.rollback();
    return packPayloadRes(
      res,
      h.resCode.cltchannel01.unknowsErr,
      h.msgType.cltChannel01Res,
      "기타 오류"
    );
  }
});

router.get("/", async (req, res, next) => {
  try {
    const exChannel = await ChannelMember.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (!exChannel) {
      return packPayloadRes(
        res,
        h.resCode.cltchannel02.notExistChannel,
        h.msgType.cltChannel02Res,
        "유저가 포함된 채널 정보없음"
      );
    }

    return packPayloadRes(
      res,
      h.resCode.cltchannel02.OK,
      h.msgType.cltChannel02Res,
      "채널 정보 조회 성공",
      exChannel
    );
  } catch (err) {
    return packPayloadRes(
      res,
      h.resCode.cltchannel02.unknowsErr,
      h.msgType.cltChannel02Res,
      "기타 오류"
    );
  }
});

module.exports = router;
