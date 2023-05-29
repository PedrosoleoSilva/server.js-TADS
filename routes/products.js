const express = require("express");
const { saveProduct, getAllProducts, getProductById, updateProducts, updateProduct, deleteProduct } = require("../database/products");
const auth = require("../middlewares/auth");
const router = express.Router();


router.get("/products", auth, async (req,res)=>{ //rota para devolver array de products
   const moreThan =req.query.more_than ? Number(req.query.more_than) : 0;
   const products = await getAllProducts(moreThan);
    res.json({
        products
    });
});
router.get("/products/:id",auth, async(req,res)=>{ //rota para devolver uma busca de um certo produto
   const id = Number(req.params.id) //usei parametro req para pegar id digitado, e convertir string em numero
   const product = await getProductById(id)
    res.json({
        product
    })
});

router.post("/products",auth, async (req,res)=>{ //adicionar novo produto
    //console.log(req.body)
    const newProduct ={
        name: req.body.name,
        price: req.body.price
    }
     const savedProduct =  await saveProduct(newProduct)
    res.json({
        product : savedProduct
    })
});
router.put("/products/:id",auth, async (req,res)=>{ //atualizar produto
    //console.log(req.body)
    const id = Number(req.params.id);
   const product ={
    name: req.body.name,
    price: req.body.price
   }
   const updatedProduct = await updateProduct(id, product);
   res.json({
    product: updatedProduct
   })
});

router.delete("/products/:id",auth, async (req,res)=>{
    const id = Number(req.params.id);
    await deleteProduct(id);
    res.status(204).send();
});

module.exports ={
    router
}