const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/database")
const passport = require("./config/passportConfig"); // Import passport config
const flash = require("connect-flash");
const session = require("express-session");
const expressMessages = require("express-messages");

const homeRoutes = require('./routes/ana_router');
const userRoutes = require('./routes/kullanici_router');
const takvimRoutes = require('./routes/etkinlik_router');
const duyurlarRoutes = require('./routes/duyurlar_router');
const finanselRoutes = require('./routes/finansel_router');
const havaRoutes = require('./routes/hava_router');
//  EJS
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.json());
//
//   (Sessions)
app.use(
    session({
      secret: "your secret key",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

  //  connect-flash
  app.use(flash());
  
  //  express-messages 
  app.use((req, res, next) => {
    res.locals.messages = expressMessages(req, res);
    next();
  });
  app.use((req, res, next) => {
    if (req.session && req.session.kullanici) {
      req.user = req.session.kullanici; // veya req.kullanici
    }
    next();
  });


// 
app.use('/Projem', homeRoutes);
app.use('/kullanici', userRoutes);
app.use('/takvim', takvimRoutes);
app.use('/duyurlar', duyurlarRoutes);
app.use('/finansel', finanselRoutes);
app.use('/hava', havaRoutes);



app.get('/', (req, res) => res.redirect("/Projem"));





// listen to port 3000
app.listen(3000, ()=> {
    console.log(' app is wokring on port 3000')
})




