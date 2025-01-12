const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/kullanici");

// Login Strategy
passport.use(
  "local.login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          req.flash("errorMessage", "Geçersiz kimlik bilgileri");
          return done(null, false, { message: "Geçersiz kimlik bilgileri" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          req.flash("errorMessage", "Yanlış şifre");
          return done(null, false, { message: "Yanlış şifre" });
        }

        req.flash("successMessage", "Login successful!");
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


// Signup Strategy
passport.use(
  "local.signup",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { name } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
          req.flash("errorMessage", "E-posta zaten kayıtlı");
          return done(null, false, { message: "E-posta zaten kayıtlı" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });

        await newUser.save();
        req.flash("registerMessage", "Kullanıcı başarıyla oluşturuldu");
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);


// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
