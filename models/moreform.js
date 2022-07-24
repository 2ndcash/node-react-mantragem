const mongoose = require('mongoose')
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    picture: { type: Schema.Types.ObjectId, ref: 'images', required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String },
    opt_fullname: { type: Boolean, default: false },
    opt_address: { type: Boolean, default: false },
    opt_card_id: { type: Boolean, default: false },
    opt_bank: { type: Boolean, default: false },
    opt_bank_name: { type: Boolean, default: false },
    activate: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, {
        timestamps: true,
        collection: 'more_forms',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('more_forms', ObjectSchema)