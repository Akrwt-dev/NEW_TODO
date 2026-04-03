require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./router/auth.js");
const addRouter = require("./router/add.js")
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json()); 
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", addRouter)
app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB()
  .then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log("server connected successfully");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
