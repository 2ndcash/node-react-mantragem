const moment = require('moment')
const CardModal = require('../models/card')

exports.ClientListCard = async (req, res) => {
    try {
        let cards = await CardModal.find({ deleted: false, user: req.user.id })
            .populate({ path: 'picture', select: '-_id filename originalName locationUrl' })
            .sort({ 'number': 1 })
            .lean().exec()

        let result = []
        for (let i = 0; i < cards.length; i++) {
            result.push({
                id: cards[i]._id,
                picture: cards[i].picture ? `/download/${cards[i].picture.filename}` : null,
                number: cards[i].number
            })
        }

        return res.send({ success: true, cards: result || [] });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.ListCard = async (req, res) => {
    try {
        let cards = await CardModal.find({ deleted: false, user: req.user.id })
            .populate({ path: 'picture', select: '-_id filename originalName locationUrl' })
            .sort({ 'number': 1 })
            .sort({ 'updatedAt': -1 })
            .lean().exec()

        let result = []
        for (let i = 0; i < cards.length; i++) {
            result.push({
                id: cards[i]._id,
                picture: cards[i].picture ? cards[i].picture : null,
                title: cards[i].title,
                number: cards[i].number,
                activate: cards[i].activate,
                createdAt: moment(cards[i].createdAt).format('DD.MM.YYYY HH:mm'),
                updatedAt: moment(cards[i].updatedAt).format('DD.MM.YYYY HH:mm')
            })
        }

        return res.send({ success: true, cards: result || [] });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.GetCard = async (req, res) => {
    try {
        const { id } = req.params

        let card = await CardModal.findOne({ _id: id, deleted: false, user: req.user.id })
            .populate({ path: 'picture', select: '_id filename originalName locationUrl' })
            .lean().exec()

        let result = {}
        if (card) {
            result = {
                id: card._id,
                picture: card.picture ? card.picture : null,
                title: card.title,
                number: card.number,
                activate: card.activate,
                createdAt: moment(card.createdAt).format('DD.MM.YYYY HH:mm'),
                updatedAt: moment(card.updatedAt).format('DD.MM.YYYY HH:mm')
            }
        }

        // console.log(result)

        return res.send({ success: true, card: result || [] });
    }
    catch (error) {
        console.log(error)
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.AddCard = async (req, res, next) => {
    try {
        let body = req.body

        if (await CardModal.countDocuments({ title: body.title, deleted: false, user: req.user.id }) > 0) {
            return res.send({ success: false, message: `ระบุ ${body.title} ซ้ำ` })
        }

        body.user = req.user.id
        await CardModal.create(body)
        return res.send({ success: true });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.EditCard = async (req, res, next) => {
    try {
        let body = req.body
        const { id } = req.params

        if (await CardModal.countDocuments({ _id: { $ne: id }, title: body.title, deleted: false }) > 0) {
            return res.send({ success: false, message: `ระบุ ${body.title} ซ้ำ` })
        }

        // console.log(body)
        body.user = req.user.id
        await CardModal.findOneAndUpdate({ _id: id }, body)
        return res.send({ success: true });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}