const express = require("express");

const router = express.Router();

const {
    getCoupons
} = require("../controllers/coupon.controller");

router.get("/", getCoupons);

module.exports = router;