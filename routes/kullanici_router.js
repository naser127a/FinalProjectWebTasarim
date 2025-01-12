const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/kullanici");
const passport = require('passport')
const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key"; // Use environment variable in production

// //  login user view 
// router.get('/login', (req,res)=> {
//   res.render('kullanici')
// })

// // login post request 
// router.post('/login', (req,res)=> {
//   console.log(req.body)
//   res.json('login in user ... ')
// })

// // sign up form 
// router.get('/signup', (req,res)=> {
//   res.render('kullanici', {
//     errorMessage: req.flash('errorMessage')
//   })
// })

// router.post(
//   "/login",
//   passport.authenticate("local.login", {
//     successRedirect: "/Projem",
//     failureRedirect: "/kullanici",
//     failureFlash: true,
//   })
// );
// router.post(
//   "/register",
//   passport.authenticate("local.signup", {
//     successRedirect: "/kullanici",
//     failureRedirect: "/kullanici",
//     failureFlash: true,
//   })
// );

// // router.get("/", (req, res) => {
// //   if (req.isAuthenticated()) {
// //     res.render("Projem", { user: req.user });
// //   } else {
// //     res.redirect("/");
// //   }
// // });


// // Render login page
// router.get("/", (req, res) => {
//   const errorMessage = req.flash("message")[0];
//   const registerMessage = req.flash("register")[0];

//   res.render("kullanici",{
//     errorMessage:errorMessage,
//     registerMessage:registerMessage,

//   });
// });



// module.exports = router;
// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "E-posta zaten kayıtlı" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    req.flash("register", "Kullanıcı başarıyla oluşturuldu");
    return res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Geçersiz kimlik bilgileri" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     
      return res.status(400).json({ message: "Yanlış şifre" });// Redirect back to the login page


    }
    req.session.userId = user._id;

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    req.flash("successMessage", "Login successful!");
    let userId = user._id;
    
    

    return res.status(200).json({
      userId,
      token,
    });
  } catch (error) {
    req.flash("message", "Server error");
    return res.status(500).json({ error });
  }
});

// Render login page
router.get("/", (req, res) => {
  const errorMessage = req.flash("message")[0];
  const registerMessage = req.flash("register")[0];

  res.render("kullanici",{
    errorMessage:errorMessage,
    registerMessage:registerMessage,

  });
});

module.exports = router;
