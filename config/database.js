
const mongoose = require("mongoose");

//  MongoDB
mongoose
  .connect("mongodb://localhost:27017/ProjeDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

