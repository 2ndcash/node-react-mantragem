const mongoose = require('mongoose')
const { Schema } = mongoose;


const ObjectSchema = new Schema({
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    locationUrl: { type: String, required: true },
    option: { type: Object },
    alt: String,
    format: String,
    target: String,
    url: String,
}, {
        timestamps: true,
        collection: 'image_clients',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('image_clients', ObjectSchema)