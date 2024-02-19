const express = require("express");
const router = express.Router();
// Require controller modules.
const productCtrl = require("../controllers/productController");


router.get("/products",(req,res,next)=>{
    console.log("i am hitting");
    next();
}, productCtrl.getProducts);

router.post("/search_products", productCtrl.searchProducts);
router.post("/product_details/:id", productCtrl.detailedProductInformation);













module.exports = router;  // Export the base-router. 