const express = require("express");
const connectDB = require("./config/database");
const app = express();
const authRouter = require("./router/auth.js");

app.use(express.json()); 
app.use("/", authRouter);

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
