const express = require("express");
const router = express.Router();
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');


const userRoute = require("./userRoute");
const permissionRoute = require("./permissionRoute");
const roleRoute = require("./roleRoute");
const brandRoute = require("./brandRoute");
const tagRoute = require("./tagRoute");
const categoryRoute = require("./categoryRoute");
const productRoute = require("./productRoute");



router.get("/", (req,res)=>{
  res.render("signIn");
})
router.get("/index",adminAuthMiddleware, (req, res) => {
  res.render("index");
});

router.use("/permission",adminAuthMiddleware,  permissionRoute);
router.use("/user", userRoute);
router.use("/role",adminAuthMiddleware,  roleRoute);
router.use("/brand",adminAuthMiddleware,  brandRoute);
router.use("/tag",adminAuthMiddleware,  tagRoute);
router.use("/category",adminAuthMiddleware,  categoryRoute);
router.use("/product",adminAuthMiddleware,  productRoute);

module.exports = router;
