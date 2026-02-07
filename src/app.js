const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./router/auth.js");
const addRouter = require("./router/add.js")
app.use(express.json()); 
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", addRouter)
console.log("authRouter:", typeof authRouter);
console.log("addRouter:", typeof addRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB()
  .then(() => {
    console.log("DB Connected");
    app.listen(4000, () => {
      console.log("server connected successfully");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
