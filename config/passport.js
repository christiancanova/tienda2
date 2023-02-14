import passport from "passport";
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import User from '../components/users/userModel.js'

const customFields = {
    usernameField: 'mail',
    passwordField: 'password',
};

const verifyCallback = async (mail, password, done)  =>{
    try {
        const user = await User.findOne({ mail });
        if (!user) {
          return done(null, false);
        }
    
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        done(err);
      }

}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});