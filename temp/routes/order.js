const express = require("express");
const router = express.Router();
const { addOrder } = require("../controller/orderController");

// Rute untuk menampilkan semua pembeli
router.post("/", addOrder);

module.exports = router;
