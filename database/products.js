const prisma = require("./prisma");

const getAllProducts = (morethan)=>{
    return prisma.products.findMany({
        where: {
            price: {
                gt: morethan //filtro para buscar preço do produto
            }
        }
    });
}
 const getProductById = (id)=>{
    return prisma.products.findFirst({ //devolve o valor do id procurado
        where: {
        id: id
    }
    })
    
 }

const saveProduct = (product)=>{
    return prisma.products.create({
        data : product
    })
}
const updateProduct = (id, product)=>{
    return prisma.products.update({
        where: {
            id :id
        },
        data: product
    })
}

const deleteProduct = (id)=>{
    return prisma.products.delete({
        where: {
            id: id
        }
    })
}


module.exports = {
    saveProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
   
}