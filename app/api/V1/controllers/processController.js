const db = require("../../../models/index");
const { Op } = require("sequelize");



const  addToCart = async (req, res) => {
try {
    const { id, quantity} = req.body;

    // res.json(quantity);
    let cart = [];

    if(!id || !quantity || quantity <=0){
        res.json(400).json({ error: "Invalid request. Please provide valid itemId and quantity." })
    }

    const newProduct = await db.Products.findAll({
        where:{
            id: Number(id),
        },
        include:[
            { model: db.product_images, where:{isFeatured:1} },
            { model: db.product_quantity },
            { model: db.product_price, as: "product_prices" },

         ]
    });
    // res.json(newProduct[0].product_images[0].mediaId);

    const img = await db.media.findOne({
        where:{id: newProduct[0].product_images[0].mediaId},
        attributes:["name", "filepath"]
    });
    // newProduct[0].img = img.filepath;
    const newObject = {
        newProduct,
        img
    }

    // res.json(newObject);
    // res.json(newProduct[0]);

    
    if(newProduct[0].product_quantity.quantity >= Number(quantity)){
        cart.push(newObject);
        res.json({message:"product added successfully", data:cart});
    }else{
        res.json(409).json({message:`The product is out of stock.`});
    }

} catch (error) {
    console.error(error);
    res.json({error:error})
}
}








module.exports = {
    addToCart,
}