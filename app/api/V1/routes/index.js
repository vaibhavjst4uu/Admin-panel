const express = require("express");
const router = express.Router();
// Require controller modules.
const productCtrl = require("../controllers/productController");
const authCtrl = require("../controllers/authController");
const processCtrl = require("../controllers/processController");
const userCtrl = require("../controllers/userController");

const { validateLogin } = require("../middlewares/validateLogin");


router.get("/products",(req,res,next)=>{
    console.log("i am hitting");
    next();
}, productCtrl.getProducts);

router.post("/search_products", productCtrl.searchProducts);
router.post("/product_details/:id", productCtrl.detailedProductInformation);

router.post("/login",validateLogin, authCtrl.login );
router.post("/signUp", authCtrl.signup);
router.patch("/reset_password/:id", authCtrl.resetPassword);



router.post("/addToCart",  processCtrl.addToCart);



router.patch("/update_user/:id", userCtrl.updateUser);












module.exports = router;  // Export the base-router. 