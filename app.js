const express = require("express");
const app = express();
port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const path = require("path");
const methodOverride = require("method-override");
const indexRouter = require("./app/Routes/index");
const session = require("express-session");
const flash = require("connect-flash");




app.use(
  session({
    secret: "qwertyuiop",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(express.json({ limit: "500mb" })); //parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("views", path.join(__dirname, "app/Views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use("/", indexRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
