const express = require("express");
const router = express.Router();
const permissionCtrl = require("../Controllers/permissionController");




router.get("/data", permissionCtrl.findAlll);
router.delete("/delete/:id", permissionCtrl.deletePermission);
router.patch('/update/:id', permissionCtrl.updatePermission);
router.post("/create", permissionCtrl.addPermission);


module.exports = router;
