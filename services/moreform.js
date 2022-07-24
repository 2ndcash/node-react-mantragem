const moment = require('moment')
const MoreFormModal = require('../models/moreform')

exports.ListForm = async (req, res) => {
    try {
        let cards = await MoreFormModal.find({ deleted: false })
            .populate({ path: 'picture', select: '-_id filename originalName locationUrl' })
            .sort({ 'updatedAt': -1 })
            .lean().exec()

        let result = []
        for (let i = 0; i < cards.length; i++) {
            result.push({
                id: cards[i]._id,
                picture: cards[i].picture ? cards[i].picture : null,
                title: cards[i].title,
                activate: cards[i].activate,
                createdAt: moment(cards[i].createdAt).format('DD.MM.YYYY HH:mm'),
                updatedAt: moment(cards[i].updatedAt).format('DD.MM.YYYY HH:mm')
            })
        }

        return res.send({ success: true, more_forms: result || [] });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.GetForm = async (req, res) => {
    try {
        const { id } = req.params

        let card = await MoreFormModal.findOne({ _id: id, deleted: false })
            .populate({ path: 'picture', select: '_id filename originalName locationUrl' })
            .lean().exec()

        let result = {}
        if (card) {
            result = {
                id: card._id,
                picture: card.picture ? card.picture : null,
                title: card.title,
                opt_fullname: card.opt_fullname,
                opt_address: card.opt_address,
                opt_card_id: card.opt_card_id,
                opt_bank: card.opt_bank,
                opt_bank_name: card.opt_bank_name,
                content: card.content,
                activate: card.activate,
                createdAt: moment(card.createdAt).format('DD.MM.YYYY HH:mm'),
                updatedAt: moment(card.updatedAt).format('DD.MM.YYYY HH:mm')
            }
        }

        // console.log(result)

        return res.send({ success: true, more_form: result || [] });
    }
    catch (error) {
        console.log(error)
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.AddForm = async (req, res, next) => {
    try {
        let body = req.body

        if (await MoreFormModal.countDocuments({ title: body.title, deleted: false }) > 0) {
            return res.send({ success: false, message: `ระบุ ${body.title} ซ้ำ` })
        }

        body.user = req.user.id
        await MoreFormModal.create(body)
        return res.send({ success: true });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.EditForm = async (req, res, next) => {
    try {
        let body = req.body
        const { id } = req.params

        if (await MoreFormModal.countDocuments({ _id: { $ne: id }, title: body.title, deleted: false }) > 0) {
            return res.send({ success: false, message: `ระบุ ${body.title} ซ้ำ` })
        }

        // console.log(body)
        body.user = req.user.id
        await MoreFormModal.findOneAndUpdate({ _id: id }, body)
        return res.send({ success: true });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}