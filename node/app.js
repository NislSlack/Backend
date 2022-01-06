const createError = require("http-errors");
const helmet = require("helmet");
const passport = require("passport");
const express = require("express");
const cookieParser = require("cookie-parser");
const morganMiddleware = require("./.config/morgan");
const session = require("express-session");
// const RedisStore = require("connect-redis")(session);
const logger = require("./.config/winston");
const swaggerUi = require("swagger-ui-express");
const specs = require("./.swagger");
// const redis = require("redis");
const webSocket = require("./socket");
const { admin, adminRouter } = require("./.adminjs/index");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const channelRouter = require("./routes/channel");
const roomRouter = require("./routes/room");
const chatRouter = require("./routes/chat");
const cors = require('cors');



require("./.sequelize")();
const app = express();

// const redisClient = redis.createClient({ host: "redis", logErrors: true });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(admin.options.rootPath, adminRouter);

app.use(cors());

app.use(helmet());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/channel", channelRouter);
app.use("/room", roomRouter);
app.use("/chat", chatRouter);

app.use(
  session({
    secret: "secret",
    // store: new RedisStore({
    //   client: redisClient,
    // }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

const server = app.listen(3000, () => {
  logger.info(`Server Start Listening on port ${3000}`);
});

webSocket(server, app);

module.exports = app;
