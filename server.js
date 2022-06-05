require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const app = express();

//set view engine as ejs engine
app.set("view engine", "ejs");
//set view directory
app.set("views", __dirname + "/views");
//set layout folder
app.set("layout", "layouts/layout");
//use express layout middleware
app.use(expressLayouts);
//application main folder
app.use(express.static("public"));
//use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

//use mongodb
const mongoose = require("mongoose");
//connecting to Mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

///    index router  ///
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

///    Users Router  ///
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.listen(process.env.Port || 3000, () => console.log("server running..."));
