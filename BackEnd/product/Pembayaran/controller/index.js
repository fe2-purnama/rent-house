const login = require("./loginController");
const register = require("./registerController");
const profile = require("./profileController");
//dian
const buyers = require("./buyerController.js");
const invoices = require("./invoiceController.js");

module.exports = {
  login,
  register,
  profile,
  buyers, //dian
  invoices, //dian
};
