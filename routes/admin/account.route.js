const express = require("express");
const controller = require("../../controllers/admin/account.controller");
const router = express.Router();



router.get("/create", controller.create );
router.post("/create", controller.createPost );

router.get("/user", controller.user );




module.exports = router;