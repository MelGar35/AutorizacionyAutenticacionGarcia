import passport from "passport";
import local from "passport-local"
import {userModel} from "../models/users.models.js"
import {hashPassword,comparePassword} from "../utils.js"
import GitHubStrategy from "passport-github2"

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use( "register", new LocalStrategy(
        { usernameField: "email", passReqToCallback: true}, async (req, username, password, done) => {
        const {first_name,last_name,email, age} = req.body

    try {
     let user = await userModel.findOne({ email: username })
        if (user) {
          console.log('Usuario ya existe')
          return done(null, false)
        }
        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: hashPassword(password)
        }
        let result = await userModel.create(newUser)
        return done(null, result)
      } catch (error) {
        res.send(error)
      }
    }
  ))

  
  passport.use('github', new GitHubStrategy({
    clientID: "Iv1.10b9de6870413b69",
    clientSecret: '23b2f4891e9836894acc656d29786e6cfdcd8b55',
    callbackURL: 'http://localhost:3000/session/githubcallback',
     scope: "user:email"
  }
    , async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await userModel.findOne({ email: profile.emails[0].value })
        if (!user) {
          const newUser = {
            first_name: profile._json.name,
            last_name: 'undefined',
            email: profile.emails[0].value,
            age: 'null',
            password: ''
          }
          let result = userModel.create(newUser)
          done(null, result)
        } else {
          done(null, user)
        }
      } catch (error) {
        return done(error)
      }

    }))

// passport.use("restore")

passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            console.log("User not found");
            return done(null, false);
          }

          if (!comparePassword(user, password)) {
            console.log("Invalid password");
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(`Error: ${error}`, false);
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
  
}

export default initializePassport

