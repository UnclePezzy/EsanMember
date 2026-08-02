const express = require("express");

const router = express.Router();

router.use("/customers", require("./customer.routes"));
router.use("/promotions", require("./promotion.routes"));
router.use("/coupons", require("./coupon.routes"));

module.exports = router;