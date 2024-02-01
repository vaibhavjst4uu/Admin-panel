const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const permissionRoute = require("./permissionRoute");
const roleRoute = require("./roleRoute");

router.get("/index", (req, res) => {
  res.render("index");
});

router.use("/permission", permissionRoute);
router.use("/user", userRoute);
router.use("/role", roleRoute);

module.exports = router;
