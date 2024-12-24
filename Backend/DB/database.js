const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: 'majority' }, // Add this option
    })
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.error("DB Connection Issue...", err);
      process.exit(1);
    });
};
