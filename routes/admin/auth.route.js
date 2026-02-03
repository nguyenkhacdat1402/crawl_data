const express = require("express");
const controller = require("../../controllers/admin/auth.controller")
const router = express.Router();


router.get("/login", controller.login)
router.post("/login", controller.postLogin)

router.get("/logout", controller.logout)

module.exports = router;