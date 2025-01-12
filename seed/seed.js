const db = require("../config/database");
const User = require("../models/kullanici");

let user1 = new User({
  name: "nasser",
  email: "nasser@gmail.com",
  password: "nasser127",
});

user1
  .save()
  .then(() => {
    console.log("Kullanıcı başarıyla kaydedildi.");
  })
  .catch((err) => {
    console.error("Hata oluştu:", err);
  });
