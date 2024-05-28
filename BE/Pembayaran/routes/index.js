var express = require("express");
var router = express.Router();
var { profile } = require("../controller/profileController");
var { isLogin } = require("../library/verify");

//menambah variabel buyerRoutes- Dian
const buyerRoutes = require("./buyer");
const invoiceRouter = require("./invoice");

router.get("/profile", isLogin, profile);

// Gunakan rute untuk pembeli (/buyer)- dian
router.get("/buyer", buyerRoutes);
router.get("/buyer/:id", buyerRoutes);
router.patch("/buyer/:id", buyerRoutes);
router.delete("/buyer/:id", buyerRoutes);
// Gunakan rute untuk invoice
router.use("/invoice", invoiceRouter);

module.exports = router;
