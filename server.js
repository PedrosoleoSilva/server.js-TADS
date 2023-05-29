const express = require("express");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const healthRoutes = require("./routes/health");
const logger = require("./middlewares/logger");
const server = express(); //criando a instancia do express



server.use(logger);
server.use(express.json());
server.use(productsRoutes.router);
server.use(healthRoutes.router);
server.use(usersRoutes.router);

module.exports = {server}
