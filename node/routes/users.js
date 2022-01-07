const express = require("express");
const { User, sequelize } = require("../models");
const { packPayloadRes } = require("../lib/response");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const regiUser = await sequelize.transaction();
  try {
    const exUser = await User.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (exUser) {
      return packPayloadRes(res, 2, "해당 이름에 유저 정보있음");
    }

    await User.create({
      name: req.body.user_name,
      user_id: req.body.user_id,
      user_pw: req.body.user_pw,
    });
    await regiUser.commit();
    return packPayloadRes(res, 0, "유저 등록 성공");
  } catch (err) {
    await regiUser.rollback();
    console.log(err);
    return packPayloadRes(res, 1, "기타 오류", err);
  }
});

/* POST users listing. */
router.post("/login", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (!exUser) {
      return packPayloadRes(res, 2, "해당 이름에 유저 정보없음");
    }

    const loginUser = await User.findOne({
      where: {
        user_id: req.body.user_id,
        user_pw: req.body.user_pw,
      },
    });
    if (!loginUser) {
      return packPayloadRes(res, 2, "유저 아이디나 유저 비밀번호가 틀림");
    }

    return packPayloadRes(res, 0, "로그인 성공");
  } catch (err) {
    return packPayloadRes(res, 1, "기타 오류", err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (!exUser) {
      return packPayloadRes(res, 2, "해당 이름에 유저 정보없음");
    }

    return packPayloadRes(res, 0, "로그아웃 성공");
  } catch (err) {
    return packPayloadRes(res, 1, "기타 오류", err);
  }
});

module.exports = router;
