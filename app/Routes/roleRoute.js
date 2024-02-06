const express = require("express");
const router = express.Router();
const roleCtrl = require("../Controllers/rolesController");




router.get("/data", roleCtrl.findAlll);
router.delete("/delete/:id", roleCtrl.deleteRole);
router.patch('/update/:id', roleCtrl.updateRole);
router.post("/create", roleCtrl.addRole);



// role has permission route

router.get("/role_has_permissions", roleCtrl.Alldata);
router.post("/role_has_permissions", roleCtrl.savePermission);
router.get("/roleSpecificPermission/:id", roleCtrl.roleSpecificPermission);


module.exports = router;
