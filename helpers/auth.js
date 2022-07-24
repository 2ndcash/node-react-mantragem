const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const requestHelper = require('../helpers/request')
const config = require('config')

let refreshTokens = {}

const logOut = (res) => {
    res.clearCookie('token');
}

exports.middleware = async (req, res, next) => {

    let token = requestHelper.getToken(req)

    if (!token) { logOut(res); return res.redirect('/login') }

    if (token) {
        UserModel.where('token').equals(token).findOne((err, user) => {
            if (err) { logOut(res); return res.redirect('/login') }
            if (!user) { logOut(res); return res.redirect('/login') }

            const secret = user.hash + user.salt + config.get('jwt').salt

            // verifies secret and checks exp
            jwt.verify(token, secret, async function (err, decoded) {
                if (err) { logOut(res); return res.redirect('/login') }
                req.user = user
                next()
            })
        })
    }
}

exports.middlewareSSR = async (req, res, next) => {
    let token = requestHelper.getToken(req)
    // console.log('2.', req.cookies)
    if (token) {
        const user = await UserModel.findOne({ token: token })
        if (!user) return next(new Error('UnauthorizedError, No token provided.'))

        const secret = user.hash + user.salt + config.get('jwt').salt

        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.clearCookie('token');
                return next(err)
            }
            else {
                req.user = decoded
                return next()
            }
        })
    }
    else {
        return next(new Error('UnauthorizedError, No token provided.'))
    }
}

exports.middlewareCustomer = async (req, res, next) => {
    let token = requestHelper.getClientId(req)
    try {
        if (token) {
            const user = await UserModel.findOne({ _id: token })
            if (!user) return res.status(401).send({ message: 'Unauthorized, No token provided.' })

            req.user = user;
            return next()
        }
        else {
            return res.status(401).send({ message: 'Unauthorized, No token provided.' })
        }
    }
    catch (error) { return res.status(401).send({ message: 'Unauthorized, No token provided.' }) }
}

exports.isLogin = async (req, res, next) => {
    let token = requestHelper.getToken(req)
    if (token) {
        const user = await UserModel.where('token').equals(token).findOne()

        const secret = user.hash + user.salt + config.jwt.salt

        // verifies secret and checks exp
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.clearCookie('token');
                return next();
            } else {
                res.redirect('/');
            }
        })
    } else {
        next();
    }
}

// middleware function to check for logged-in users
exports.sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
        next();
    } else {
        next();
    }
};
