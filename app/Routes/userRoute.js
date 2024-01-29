const express = require("express");
const router = express.Router();
const userCtrl = require("../Controllers/userController");


// router.use(express)

router.get("/userdata", userCtrl.findAll);

router.delete("/delete/:id", userCtrl.deleteUser);
router.post("/createUser", userCtrl.addUser);
router.patch('/updateUser/:id', userCtrl.updateUser);


module.exports = router;
