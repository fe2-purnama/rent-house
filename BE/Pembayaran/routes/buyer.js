const express = require("express");
const router = express.Router();
const {
  getBuyers,
  getBuyerById,
  updateBuyer,
  deleteBuyer,
} = require("../controller/buyerController");

// Rute untuk menampilkan semua pembeli
router.get("/buyers", getBuyers);

// Rute untuk menampilkan pembeli berdasarkan ID
router.get("/buyer/:id", getBuyerById);
router.patch("/buyer/:id", updateBuyer);
router.delete("/buyer/:id", deleteBuyer);

module.exports = router;
