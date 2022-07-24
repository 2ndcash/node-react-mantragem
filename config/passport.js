

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportJWT = require("passport-jwt"),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    UserModel = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, cb) => {
        return UserModel.findOne({ email: email.toLocaleLowerCase() })
            .then(user => {
                // console.log(email, password)
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' })
                }
                if (!user.validatePassword(password)) {
                    return cb(null, false, { message: 'Incorrect email or password.' })
                }

                if (!user.is_admin) return cb(null, false, { message: 'Incorrect email or password.' })

                user.setJWT()   //if auto gen token
                user.save()

                return cb(null, user, { message: 'Logged In Successfully' })
            })
            .catch(err => cb(err))
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    UserModel.findById(user.id, function (err, _user) {
        done(err, _user);
    });
});

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'your_jwt_secret'
// },
//     (jwtPayload, cb) => {
//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

//         return UserModel.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));