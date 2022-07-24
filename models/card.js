const mongoose = require('mongoose')
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    picture: { type: Schema.Types.ObjectId, ref: 'images', required: true },
    title: { type: String, required: true },
    number: { type: Number, default: 0 },
    activate: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, {
        timestamps: true,
        collection: 'cards',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('cards', ObjectSchema)