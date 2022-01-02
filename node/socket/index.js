const SocketIO = require('socket.io');
var redis = require('socket.io-redis');

module.exports = (server) => {
  // 이는 클라이언트가 /socket.io 경로 접근시 소켓 연결을 시작함을 의미
  const io = SocketIO(server, { path: '/socket.io', cors: { origin: '*' } });
  io.adapter(redis({ host: 'redis' }));

  // 연결시 connection 이벤트 발생한 후 콜백 실행
  io.on('connection', (socket) => {
    // ws에 req가 따로 있었다면 socket에서는 socket.request에 존재합니다
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`✔ ${ip} 클라이언트 접속, socket.id : ${socket.id}`);

    // 연결 해제
    socket.on('disconnect', () => {
      console.log(`${ip} 클라이언트 접속 해제. socket.id : ${socket.id}`);
      clearInterval(socket.interval);
    });
    // 에러
    socket.on('error', (error) => {
      console.log(error);
    });
  });
};
