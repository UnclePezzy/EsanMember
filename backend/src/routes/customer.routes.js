const express = require("express");

const router = express.Router();

const {

    getCustomers,
    saveCustomer

} = require("../controllers/customer.controller");

router.get("/", getCustomers);

router.post("/", saveCustomer);

module.exports = router;