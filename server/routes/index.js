var cors = require('cors')
var csrf = require('csurf')

const authHelper = require('../../helpers/auth')
const AWSs3Helper = require('../../helpers/AWSs3')
const logHelper = require('../../helpers/log')

module.exports = (app) => {
    app.use(cors());
    app.use('/customer', authHelper.middlewareCustomer, require('./customer'))

    app.use(csrf({ cookie: true }))
    app.get('/download/:userId/pictures/:name', AWSs3Helper.download)
    app.use('/auth', require('./auth'))
    app.use('/api', authHelper.middlewareSSR, require('./api'))

    app.use(logHelper.reqLog, (req, res, next) => {
        if (req.path.indexOf('/css/') > -1
            || req.path.indexOf('/fonts/') > -1
            || req.path.indexOf('/vendors/') > -1) return next()

        // console.log('1.', req.cookies)

        // console.log('1. ' + req.path)
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');
            res.clearCookie('token')

            res.cookie('XSRF-TOKEN', req.csrfToken())
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

            return res.redirect('/login')
        }

        // console.log('2. ' + req.path)
        res.cookie('XSRF-TOKEN', req.csrfToken())
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    });

    app.get('/login', authHelper.sessionChecker)
    app.get('/register', (req, res, next) => { next() })
    app.get('/logout', (req, res, next) => {
        res.clearCookie('user_sid');
        res.clearCookie('token')

        req.session.destroy();

        req.logout();

        res.redirect('/login')

        return;
    })
}