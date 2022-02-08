const passport = require('passport')
const {jwt_key} = require('./environment')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/user')

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_key
}

passport.use(new JWTStrategy(opts , (jwtPayload, done ) => {
    User.findById(jwtPayload._id, (error , user) => {
        if(error) {
            console.log(`Error inside passport middleware : ${error}`)
            return done(err,false);
        }
        if(user){
            return done(null ,user)
        }
        return done(null,false)
    })
}))

module.exports = passport
// passport.use()