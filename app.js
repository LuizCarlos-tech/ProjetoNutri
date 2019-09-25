const express = require("express");
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const requireDir = require("require-dir");
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.set('view engine','ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/autenticacao', { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("connected to mongo db");
});
requireDir("./models");
//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', (req, res) =>{
    res.render('home',{user: req.user});
});

app.listen(3000, () => {
    console.log('APP LISTENING FOR REQUESTS ON PORT 3000')
});