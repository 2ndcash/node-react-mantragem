const moment = require('moment')
const CardModal = require('../models/card')
const CustomerModal = require('../models/customer')
const ExperienceModal = require('../models/experience')
const { customer_running } = require('../helpers/generator')

exports.Dashboard = async (req, res, next) => {
    try {
        let filter = { deleted: false }

        const customers = await CustomerModal.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: 'image_clients',
                    localField: 'picture',
                    foreignField: '_id',
                    as: 'picture'
                }
            },
            // { $unwind: '$picture' }, //array to obj
            {
                $project: {
                    '_id': '$_id',
                    my_code: '$my_code',
                    ref_code: '$ref_code',
                    email: '$email',
                    birthday: '$birthday',
                    fname: '$user.fname',
                    lname: '$user.lname',
                    createdAt: '$createdAt'
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]).exec()

        for (let item of customers) {
            item.createdAt = moment(item.createdAt).format('DD.MM.YYYY HH:mm')
            item.birthday = moment(item.birthday, 'DD/MM/YYYY').format('DD.MM.YYYY')
        }

        console.log(customers)

        return res.send({ success: true, customers: customers, total_customer: customers.length });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.ListCard = async (req, res) => {
    try {
        let cards = await CardModal.find({ deleted: false })
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

exports.NewCustomer = async (req, res) => {
    try {
        //birthday == DD/MM/YYYY
        let { email, birthday, ref_code, card, number, sex } = req.body
        let customer = null;

        customer = await CustomerModal.findOne({ deleted: false, email: email, birthday: birthday })
        if (customer) {//Update
            customer.ref_code = ref_code;
            customer.card = card;
            customer.sex = sex;
            customer.number = number;
        }
        else { //Create
            customer = await CustomerModal.create({
                my_code: await customer_running(),
                email: email,
                birthday: birthday,
                ref_code: ref_code,
                sex: sex,
                card: card,
                number: number
            })
        }

        const _exprience = await ExperienceModal.create({ ref_code: ref_code, card: card, number: number })

        const experiences = customer.experiences || [];
        experiences.push(_exprience._id)
        customer.experiences = experiences;
        customer.save();

        return res.send({ success: true, data: { id: customer._id } });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}

exports.UpdateCustomer = async (req, res) => {
    try {
        //birthday == DD/MM/YYYY
        const { id } = req.params;
        let { mobile } = req.body
        let ref_code = "";

        let customer = await CustomerModal.findOne({ deleted: false, _id: id })
        if (customer) {
            customer.mobile = mobile;
            customer.save();

            ref_code = customer.my_code;
        }

        return res.send({ success: true, data: { ref_code: ref_code } });
    }
    catch (error) {
        return res.send({ success: false, message: 'เกิดข้อผิดพลาด' + error })
    }
}