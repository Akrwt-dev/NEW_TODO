const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://volcanoak1_db_user:KEmeeJMATujS5ycx@todo.hzfxmif.mongodb.net/TODO",
  );
};
module.exports = connectDB;
