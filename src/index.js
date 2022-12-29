const express = require("express");
const configs = require("./config");
const { sequelize } = require("./models");
const { AppError, handleErrors } = require("./helpers/error");
const app = express();
app.use(express.json());
app.use(express.static("."));

//Sync cái model của sequelize với DB
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
const authorization = require("./middlewares/authorization");

app.use("/api/v1", v1);

//Demo authorization
// app.get("/auth", authorization, (req, res, next) => {
// })

//Demo handle error
app.get('/error', (req, res, next) => {
    throw new AppError(500, "Internal Server");
    // next( AppError(500, "Internal Server"));
});

//Middleware dùng để bắt và xử lý trả lỗi ra cho client
//Phải đặt bên dưới các routers
app.use(handleErrors);

app.listen(configs.PORT);