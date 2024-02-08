const express = require("express");
const router = express.Router();

// Require controller modules.
const categoryCtrl = require("../Controllers/categoriesController");




router.get("/data",categoryCtrl.findAll);
router.post("/create", categoryCtrl.addCategory);
router.delete("/delete/:id", categoryCtrl.deleteCategory);
router.patch('/update/:id', categoryCtrl.updateCategory);







module.exports = router;