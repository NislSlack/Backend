const SocketIO = require("socket.io");
const { Chat, Room, sequelize } = require("../models");
// var redis = require("socket.io-redis");

const user = {};

module.exports = (server) => {
  // 이는 클라이언트가 /socket.io 경로 접근시 소켓 연결을 시작함을 의미
  const io = SocketIO(server, { path: "/socket.io", cors: { origin: "*" } });
  // io.adapter(redis({ host: "redis" }));
  // 연결시 connection 이벤트 발생한 후 콜백 실행
  io.on("connection", (socket) => {
    if (!user[socket.id]) {
      user[socket.id] = { id: socket.id };
    }
    // ws에 req가 따로 있었다면 socket에서는 socket.request에 존재합니다
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(`✔ ${ip} 클라이언트 접속, socket.id : ${socket.id}`);

    socket.on("chat_join", function (data) {
      console.log(`---------${socket.id}'s join-----------`);
      data.map((data) => {
        const { channel_name, room_name } = data;
        socket.join(channel_name + room_name);
        console.log(channel_name + room_name);
      });
      console.log("---------------------------------------");
    });

    socket.on("chat_message", async function (data) {
      const date = new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .split("T")[0];
      const time = new Date().toTimeString().split(" ")[0];

      data.created = date + " " + time;
      console.log("message from client: ", data);
      const { channel_name, room_name } = data;

      const room_id = await Room.findOne({
        attributes: ["id"],
        where: {
          channel_name: data.channel_name,
          name: data.room_name,
        },
      });
      await Chat.create({
        channel_name: data.channel_name,
        room_id: room_id.dataValues.id,
        maker: data.user_name,
        content: data.content,
        created: data.created,
      });
      io.sockets.in(channel_name + room_name).emit("chat_message", data);
    });

    socket.on("rtc_ID", () => {
      socket.emit("rtc_yourID", socket.id);
      io.sockets.emit("rtc_allUsers", user);
    });
    socket.on("rtc_callUser", (data) => {
      io.to(data.userToCall).emit("rtc_hey", {
        signal: data.signalData,
        from: data.from,
      });
    });

    socket.on("rtc_acceptCall", (data) => {
      io.to(data.to).emit("rtc_callAccepted", data.signal);
    });

    // 연결 해제
    socket.on("disconnect", () => {
      console.log(`${ip} 클라이언트 접속 해제. socket.id : ${socket.id}`);
      clearInterval(socket.interval);
      if (user[socket.id]) {
        delete user[socket.id];
      }
    });
    // 에러
    socket.on("error", (error) => {
      console.log(error);
    });
  });
};
