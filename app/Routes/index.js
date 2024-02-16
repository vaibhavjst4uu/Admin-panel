const express = require("express");
const router = express.Router();

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
router.get("/index", (req, res) => {
  res.render("index");
});

router.use("/permission", permissionRoute);
router.use("/user", userRoute);
router.use("/role", roleRoute);
router.use("/brand", brandRoute);
router.use("/tag", tagRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);

module.exports = router;
