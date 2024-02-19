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
const apiRoute = require("../api/V1/routes");



router.get("/", (req,res)=>{
  res.render("signIn");
})
router.get("/index",adminAuthMiddleware, (req, res) => {
  res.render("index");
});
router.use("/user", userRoute);
// router.use("/permission",adminAuthMiddleware,  permissionRoute);
// router.use("/role",adminAuthMiddleware,  roleRoute);
// router.use("/brand",adminAuthMiddleware,  brandRoute);
// router.use("/tag",adminAuthMiddleware,  tagRoute);
// router.use("/category",adminAuthMiddleware,  categoryRoute);
// router.use("/product",adminAuthMiddleware,  productRoute);
// Define all routes
const routes = [
  { path: "/permission", route: permissionRoute },
  { path: "/role", route: roleRoute },
  { path: "/brand", route: brandRoute },
  { path: "/tag", route: tagRoute },
  { path: "/category", route: categoryRoute },
  { path: "/product", route: productRoute }
];

// Apply the common middleware to all routes
routes.forEach(({ path, route }) => {
  router.use(path, adminAuthMiddleware, route);
});



//api route
router.use('/api/v1',apiRoute );

module.exports = router;
