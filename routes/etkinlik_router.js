const express = require("express");
const router = express.Router();
const Event = require("../models/etkinlik");
const { check, validationResult } = require("express-validator"); 
const user = require("../models/kullanici")
//
router.get("/", (req, res) => {
  res.render("takvim");
});

// function isAuthenticated(req, res, next) {
//   if (req.user) {
//     return next();
//   }
//   res.status(401).send("Kullanıcı giriş yapmamış.");
// }



// Yeni etkinlik ekleme rotası
router.post(
  "/addEvent",
  check("title")
    .isLength({ min: 5 })
    .withMessage("Title should be more than 5 char"),
    check("time")
    .matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)  
    .withMessage("Time should be in HH:mm format"),
  async (req, res) => {
    try {
      const newEventdbody = req.body;
      
      if (!newEventdbody.userId){
       
        req.flash("etkinlikKaydetme", "Lütfen giriş yapınız");
        req.session.etkinlikKaydetme = "Lütfen giriş yapınız";
        let etkinlikKaydetme =req.session.etkinlikKaydetme;

        console.log("giriş yapmalısın ")
        res.render("/takvim",{ etkinlikKaydetme:etkinlikKaydetme });
        
        
      }else{
      console.log(req.userId)
      const newEvent = new Event({
        title: newEventdbody.title,
        time: newEventdbody.time,
        day: newEventdbody.day,
        month: newEventdbody.month,
        year: newEventdbody.year,
        userId:newEventdbody.userId

      });
      await newEvent.save();
      res.redirect("/takvim");
    }

      
      
    } catch (error) {
      console.error("Hata:", error);
      res.status(500).json({ error: "Etkinlik kaydedilirken bir hata oluştu" });
    }
  }
);



router.get("/getEvents/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const etkinlikler = await Event.find({userId:id}); // Veritabanından tüm etkinlikleri alır
    
    res.status(200).json(etkinlikler);
  } catch (error) {
    console.error("Etkinlikler alınırken hata:", error);
    res.status(500).json({ error: "Etkinlikler yüklenirken hata oluştu." });
  }
});

router.delete("/deleteEvent/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).send("Geçersiz etkinlik kimliği.");
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).send("Etkinlik bulunamadı.");
    }

    res.status(200).send("Etkinlik silindi.");
  } catch (error) {
    console.error("Silme hatası:", error);
    res.status(500).send("Silme sırasında hata oluştu.");
  }
});

router.put("/editEvent/:id", async (req, res) => {
  const { id } = req.params;
  const { title, time } = req.body;

  if (!id || id === "undefined") {
    return res.status(400).send("Geçersiz etkinlik kimliği.");
  }

  try {
    //
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, time },
      { new: true } //
    );

    if (!updatedEvent) {
      return res.status(404).send("Etkinlik bulunamadı.");
    }

    res.status(200).json(updatedEvent); // 
  } catch (error) {
    console.error("Etkinlik güncellenirken hata oluştu:", error);
    res.status(500).send("Etkinlik güncellenirken bir hata oluştu.");
  }
});




module.exports = router;
