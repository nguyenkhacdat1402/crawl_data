const express = require("express");
const controller = require("../../controllers/client/compare.controller");
const router = express.Router();

router.get("/fptshop", controller.compareFptshopGet );
router.post("/fptshop", controller.compareFptshopPost);

router.get("/cellphones", controller.compareCellphonesGet );
router.post("/cellphones", controller.compareCellphonesPost);

module.exports = router;