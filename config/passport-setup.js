const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const { User } = require('../app/models');

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  User.findOne({where:{id: id}}).then((user)=>{
      done(null, user);
  });
});

passport.use(
    new GoogleStrategy({
    //options for the google strat

    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, (acessToken, refreshToken ,profile , done) => {
        //check if user already exists in our db
        console.log(profile);
        User.findOne({where:{googleid: profile.id}}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            }else{
                //if not, create user in our db

                const user = User.create({ name: profile.displayName, 
                    googleid: profile.id, 
                    thumbnail: profile._json.picture }).then((newUser)=>{
                      console.log('new user created:'+ newUser);
                      done(null, newUser);
                  });
            }
        });
    })  
)