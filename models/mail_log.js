const mongoose = require('mongoose')
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    message: String,
    error: Boolean,
    receiver: String,
    info: Object,
}, {
        timestamps: true,
        collection: 'maillogs',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('maillogs', ObjectSchema)