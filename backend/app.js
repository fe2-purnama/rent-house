var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("req-flash");
var cors = require("cors");
var dotenv = require("dotenv");

var indexRouter = require("./routes/index");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const userRoutes = require("./routes/userList");
const buyerRoutes = require("./routes/buyer");
const invoiceRouter = require("./routes/invoice");
const orderRouter = require("./routes/order");
const productRoutes = require("./routes/productRoutes");
const homeRouter = require("./routes/home")

var app = express();

dotenv.config()
const port = process.env.PORT || 3000

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use("/", homeRouter);
app.use("/", indexRouter);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/userList", userRoutes); // Mount userList routes at '/userList'

//dian
app.use("/invoice", invoiceRouter);
app.use("/buyers", buyerRoutes);
app.use("/orders", orderRouter);
//akhsya
app.use("/property", productRoutes);

module.exports = app;
