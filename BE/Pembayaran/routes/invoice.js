const express = require("express");
const router = express.Router();
const { getInvoice } = require("../controller/invoiceController");

// Rute untuk menampilkan invoice berdasarkan orderId
router.get("/:orderId", getInvoice);

module.exports = router;
