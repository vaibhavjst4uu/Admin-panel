const express = require("express");
const router = express.Router();
const userCtrl = require("../Controllers/userController");


// router.use(express)

router.get("/data", userCtrl.findAll);

router.delete("/delete/:id", userCtrl.deleteUser);
router.post("/create", userCtrl.addUser);
router.patch('/update/:id', userCtrl.updateUser);


// routes for user_has_role

router.get("/userSpecificRole/:id", userCtrl.userSpecificRole);
router.post("/assignRole", userCtrl.assignRole);


module.exports = router;
