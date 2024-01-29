const express = require("express");
const router = express.Router();
const roleCtrl = require("../Controllers/rolesController");




router.get("/roledata", roleCtrl.findAlll);
router.delete("/deleteRole/:id", roleCtrl.deleteRole);
router.patch('/updateRole/:id', roleCtrl.updateRole);
router.post("/createRole", roleCtrl.addRole);


module.exports = router;
