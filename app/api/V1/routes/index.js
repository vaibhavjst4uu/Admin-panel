const express = require("express");
const router = express.Router();
// Require controller modules.
const productCtrl = require("../controllers/productController");
const authCtrl = require("../controllers/authController");
const processCtrl = require("../controllers/processController");
const userCtrl = require("../controllers/userController");
const { validateLogin } = require("../middlewares/validateLogin");

router.get(
  "/products",
  (req, res, next) => {
    console.log("i am hitting");
    next();
  },
  productCtrl.getProducts
);
// product routes
router.post("/search_products", productCtrl.searchProducts);
router.post("/product_details/:id", productCtrl.detailedProductInformation);

// auth Routes
router.post("/login", validateLogin, authCtrl.login);
router.post("/signUp", authCtrl.signup);
router.patch("/reset_password/:id", authCtrl.resetPassword);

// process control routes
router.post("/addToCart", processCtrl.addToCart);

// user routes
router.get("/userProfile/:id", userCtrl.userDetails);
router.patch("/update_user/:id", userCtrl.updateUser);
router.post("/add_new_address/:id", userCtrl.addNewAddress);
router.get("/userSpecificAddress/:id", userCtrl.userSpecificAddr);
router.delete("/remove_addr/:id", userCtrl.removeAddress);
router.delete("/deactivate_user/:id", userCtrl.deleteUser);

module.exports = router; // Export the base-router.
