const express = require("express");
const router = express.Router();
const permissionCtrl = require("../Controllers/permissionController");




router.get("/permissiondata", permissionCtrl.findAlll);
router.delete("/deletePermission/:id", permissionCtrl.deletePermission);
router.patch('/updatePermission/:id', permissionCtrl.updatePermission);
router.post("/createPermission", permissionCtrl.addPermission);


module.exports = router;
