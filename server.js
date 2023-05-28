const express = require("express");
const productsRoutes = require("./routes/products")
const healthRoutes = require("./routes/health");
const server = express(); //criando a instancia do express

server.use(express.json());
server.use(productsRoutes.router);
server.use(healthRoutes.router);


module.exports = {server}
