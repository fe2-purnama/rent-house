const express = require("express");
const router = express.Router();
const {getBuyers, getBuyerById, updateBuyer, deleteBuyer} = require("../controller/buyerController");

// Rute untuk menampilkan semua pembeli
router.get("/", getBuyers);

// Rute untuk menampilkan pembeli berdasarkan ID
router.get("/:id", getBuyerById);
router.patch("/:id", updateBuyer);
router.delete("/:id", deleteBuyer);

module.exports = router;
