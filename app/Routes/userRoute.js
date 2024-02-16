const express = require("express");
const router = express.Router();
const userCtrl = require("../Controllers/userController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");


// router.use(express)

router.get("/data",adminAuthMiddleware, userCtrl.findAll);

router.delete("/delete/:id",adminAuthMiddleware, userCtrl.deleteUser);
router.post("/create",adminAuthMiddleware, userCtrl.addUser);
router.patch('/update/:id',adminAuthMiddleware, userCtrl.updateUser);


// routes for user_has_role

router.get("/userSpecificRole/:id",adminAuthMiddleware, userCtrl.userSpecificRole);
router.post("/assignRole",adminAuthMiddleware, userCtrl.assignRole);


// routes for SignIn

router.post("/signIn", userCtrl.signIn);
router.get("/logout",adminAuthMiddleware, userCtrl.logout);
module.exports = router;
