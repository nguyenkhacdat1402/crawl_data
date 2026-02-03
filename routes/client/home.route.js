const express = require("express");
const controller = require("../../controllers/client/home.controller");
const router = express.Router();

router.get("/", controller.index );
router.post("/compare", controller.compare );



module.exports = router;