const express = require("express");
const productsRoutes = require("./routes/products")

const server = express(); //criando a instancia do express
server.use(express.json());
server.use(productsRoutes.router);


const port = 8080;
server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});