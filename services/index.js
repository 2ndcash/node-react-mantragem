const UserModal = require('../models/user')
const ImageModal = require('../models/image')

const AWSs3 = require('../helpers/AWSs3')

exports.getUser = async (user_id) => {
    let user = await UserModal.findById(user_id).select('-refreshToken -hash -salt').lean()

    if (user.picture) {
        user.picture = await ImageModal.findById(user.picture).select('filename originalName locationUrl').lean()
    }

    const business = [];
    const articles = [];
    const comcards = [];

    user.business = business.length > 0 ? business[0] : {}
    user.article = articles.length > 0 ? articles[0] : {}
    user.comcard = comcards.length > 0 ? comcards[0] : {}

    if (user) {
        // user.package = await PackageModal.findOne({ user: user_id, active: true })
    }

    return user
}

exports.getInitialDashboard = async (req, res) => {
    try {
        const all_biz = await UserModal.find({ business_type: 1 })
            .sort({ createdAt: 'desc', updatedAt: 'desc' })
            .populate('picture', '-user -_id -updatedAt -createdAt').select('email first_name last_name picture phone_no active createdAt')
        const all_infu = await UserModal.find({ business_type: 2 })
            .sort({ createdAt: 'desc', updatedAt: 'desc' })
            .populate('picture', '-user -_id -updatedAt -createdAt').select('email first_name last_name picture phone_no active createdAt')

        res.send({
            success: true,
            all_biz,
            all_infu,
            total_biz: all_biz.length,
            total_infu: all_infu.length
        });
    } catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' })
    }
}

exports.uploadPic = async (req, res) => {
    try {
        const { _id, locationUrl, originalName, filename } = await AWSs3.uploadFile(req.file, req.user)

        res.send({ success: true, image: { _id, locationUrl, originalName, filename } });
        // res.send({ success: true, data: { } });
    } catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.uploadClientPic = async (req, res) => {
    try {
        const { _id, locationUrl, originalName, filename } = await AWSs3.uploadClientFile(req.file)

        res.send({ success: true, image: { _id, locationUrl, originalName, filename } });
        // res.send({ success: true, data: { } });
    } catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}
