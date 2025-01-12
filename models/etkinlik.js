// MongoDB bağlantısı
const mongoose = require("mongoose");

// Etkinlik şeması ve modeli
const etkinlikSchema = new mongoose.Schema({
  day: { type: Number},
  month: { type: Number},
  year: { type: Number},
  title: { type: String},
  time: { type: String},
 userId: { type: String,required: true,}, // 
});


const Etkinlik = mongoose.model("Etkinlik", etkinlikSchema,"etkinlikler");

module.exports=Etkinlik
