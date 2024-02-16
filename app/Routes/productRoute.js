const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");

// Require controller modules.
const productCtrl = require("../Controllers/productController");




router.get("/data",productCtrl.findAll);
router.post("/addProduct",productCtrl.addProduct);
router.delete("/delete/:id", productCtrl.deleteProduct);
router.patch('/update/:id', productCtrl.updateProduct);



module.exports = router;