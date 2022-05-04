const User = require('../models/User');
require('dotenv/config');
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}

module.exports = (passport) => {
    passport.use(new Strategy(options, async (payload, done) => {
        await User.findById(payload.userId).then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch((error) => {
            return done(null, false);
        })
    }))
}