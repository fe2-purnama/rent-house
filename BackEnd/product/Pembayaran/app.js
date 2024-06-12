var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("req-flash");
// var bcrypt = require('bcrypt');

var indexRouter = require("./routes/index");
const loginRoutes = require("./routes/login");
// const jwt = require('jsonwebtoken');
const registerRoutes = require("./routes/register");

//dian
const buyerRoutes = require("./routes/buyer");

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bcrypt());

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

app.use("/", indexRouter);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

//dian
app.use("/buyers", buyerRoutes);

module.exports = app;