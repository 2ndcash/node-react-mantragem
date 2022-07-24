const LogModal = require('../models/logs')

exports.reqLog = async (req, res, next) => {
    try {
        if (req.path.indexOf('/css/') > -1
            || req.path.indexOf('/fonts/') > -1
            || req.path.indexOf('/vendors/') > -1) return next()

        // console.log(req.path, req)

        await LogModal.create({ success: true, json: req.headers })
    }
    catch (err) {
        console.log(err)
        await LogModal.create({ success: false, json: err })
    }
    next()
}