const mongoose = require("mongoose");

mongoose.connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Couldn't connect to MongoDB");
    console.log(err);
  });