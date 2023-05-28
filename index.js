const express = require("express");


const server = express(); //criando a instancia do express
server.use(express.json());

server.get("/health",(req,res)=>{
    res.json({
        status : "running"
    });
});
let products = [ //array de objeto
    {
        id:1,
        name: "ps4",
        price: 2500
    },
    {
        id:2,
        name: "Nitendo Switch",
        price: 2300
    },
    {
        id:3,
        name: "xbox",
        price: 2500
    }
]
server.get("/products",(req,res)=>{ //rota para devolver array de products
    const moreThan =req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
        products: products.filter((products)=>{
            return moreThan < products.price   //devolver produto de valor maior que pedido
        })
    });
});
server.get("/products/:id",(req,res)=>{ //rota para devolver uma busca de um certo produto
   const id = Number(req.params.id) //usei parametro req para pegar id digitado, e convertir string em numero
   const product = products.find((products)=>{
        return products.id === id;  //pega id do products e compara com id que digitei na busca
    });
    res.json({
        product
    })
});

server.post("/products",(req,res)=>{ //adicionar novo produto
    //console.log(req.body)
    const newProduct ={
        id: products.length +1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
    res.json({
        product : newProduct
    })
});
server.put("/products/:id",(req,res)=>{ //atualizar produto
    //console.log(req.body)
    const id = Number(req.params.id);
    const product = products.find((product)=>{
        return product.id ===id;    
    })
    if(!product){
        res.status(404).send();
        return;
    }
    product.name = req.body.name,
    product.price = req.body.price;
    res.json({
        product 
    })
});

server.delete("/products/:id",(req,res)=>{
    const id = Number(req.params.id);
    products = products.filter((products)=>{
        return products.id !== id;
    })
    res.status(204).send();
})
const port = 8080;
server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});