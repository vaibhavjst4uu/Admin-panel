const express = require("express");
const router = express.Router();

// Require controller modules.
const brandCtrl = require("../Controllers/brandsController");

router.get("/data",brandCtrl.findAll);
router.post("/create", brandCtrl.addBrand);
router.delete("/delete/:id", brandCtrl.deleteBrand);
router.patch('/update/:id', brandCtrl.updatebrand);











module.exports = router;