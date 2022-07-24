const ImageModal = require('../models/image')
const AWSs3Helper = require('../helpers/AWSs3')

exports.cropOriginal = async (req, res) => {
    try {
        const { id, crop, resize } = req.body

        await AWSs3Helper.setCropImageS3(req.user.id, {
            imgId: id,
            crop: crop,
            resize: resize
        })

        res.send()
    } catch (error) {
        res.send('error!' + error)
    }
}

exports.getImageInfo = async (req, res) => {
    try {
        const { id } = req.params
        const img = await ImageModal.findOne({ _id: id, user: req.user.id }).select('-createdAt -updatedAt -user')
        res.send({ success: true, data: img });
    } catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.editImageInfo = async (req, res) => {
    try {
        const { _id, alt, format, target, url } = req.body
        const img = await ImageModal.findOneAndUpdate({ _id: _id, user: req.user.id }, { alt, format, target, url })
        if (!img) return res.send({ success: false, message: 'เกิดข้อผิดพลาด' })

        res.send({ success: true });
    } catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}