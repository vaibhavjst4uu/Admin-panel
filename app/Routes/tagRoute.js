const express = require("express");
const router = express.Router();
const tagsCtrl = require("../Controllers/tagsController");





router.get("/data",tagsCtrl.findAll);
router.post("/create", tagsCtrl.addTag);
router.delete("/delete/:id", tagsCtrl.deleteTag);
router.patch('/update/:id', tagsCtrl.updateTag);




module.exports = router;