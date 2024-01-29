const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const permissionRoute = require("./permissionRoute");
const roleRoute = require("./roleRoute");

router.get("/index", (req, res) => {
  res.render("index");
});

router.use("/", permissionRoute);
router.use("/", userRoute);
router.use("/", roleRoute);

module.exports = router;
