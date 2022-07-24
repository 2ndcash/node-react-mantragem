const mongoose = require('mongoose')
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    success: Boolean,
    json: Object
}, {
        timestamps: true,
        collection: 'logs',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('logs', ObjectSchema)