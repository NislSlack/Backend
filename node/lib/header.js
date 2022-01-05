"use strict";
const msgType = {
  cltChannel01Req: 0,
  cltChannel01Res: 1,
  cltChannel02Req: 2,
  cltChannel02Res: 3,
};
const resCode = {
  cltchannel01: {
    OK: 0,
    unknownErr: 1,
    existChannel: 2,
    notExistUser: 3,
  },
  cltchannel02: {
    OK: 0,
    unknownErr: 1,
    notExistChannel: 2,
  },
};

module.exports = {
  resCode,
  msgType,
};
