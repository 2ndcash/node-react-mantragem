var express = require('express'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    services = require('../../services')

var router = express.Router();

router.post('/authenticate', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (user) {
            const token = user.token

            const cookieConfig = {
                expires: new Date(Date.now() + 900000),
                httpOnly: true, // to disable accessing cookie via client side js
                //secure: true, // to force https (if you use it)
                maxAge: 86400000, // ttl in ms (remove this option and cookie will die when browser is closed)
                // signed: true // if you use the secret with cookieParser
            };

            // res.cookie('refresh_token', user.refreshToken, cookieConfig)
            req.session.user = user
            res.cookie('token', token, cookieConfig);
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json({ token })
            });

        } else {
            return res.status(422).json(info)
        }
    })(req, res, next);
});

module.exports = router;