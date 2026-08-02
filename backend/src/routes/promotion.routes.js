const express = require("express");

const router = express.Router();

const {
    getPromotions
} = require("../controllers/promotion.controller");

router.get("/", getPromotions);

module.exports = router;