const express = require("express");
const app = express();
port = process.env.PORT || 5000;
const path = require("path");
const methodOverride = require("method-override");
const indexRouter = require("./app/Routes/index");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "app/Views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
app.use("/", indexRouter);

// app.get("/", (req,res)=>{
//     console.log(path.join(__dirname,"app/Views"))
//     res.send("hello I am working");
//     // res.send(__dirname);
// });
// app.get("/footer", (req,res)=>{
//     res.render("layouts/footer");
// });
// app.get("/header", (req,res)=>{
//     res.render("layouts/header");
// });

// app.get("/main", (req,res)=>{
//     res.render("layouts/main");
// });

// app.get("/sidebar", (req,res)=>{
//     res.render("layouts/sidebar");
// });

// app.get("/index", (req,res)=>{
//     res.render("index");
// });
// app.get("/userdata",(req,res)=>{
//     res.render("userdata");
// })

// app.get("/userTable",(req,res)=>{
//     res.render("layouts/userTable");
// })

// app.get("/permissiondata", (req,res)=>{
//     res.render("permissiondata");
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
