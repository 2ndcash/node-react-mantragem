const mongoose = require('mongoose')
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    ref_code: { type: String },
    number: { type: Number },
    card: { type: Schema.Types.ObjectId, ref: 'cards' },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, {
        timestamps: true,
        collection: 'experiences',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('experiences', ObjectSchema)