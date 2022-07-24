const mongoose = require('mongoose')
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    my_code: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true },
    ref_code: { type: String },
    sex: { type: String },
    number: { type: Number },
    card: { type: Schema.Types.ObjectId, ref: 'cards' },
    mobile: { type: String },
    deleted: { type: Boolean, default: false },
    picture: { type: Schema.Types.ObjectId, ref: 'image_clients' },
    experiences: [{ type: Schema.Types.ObjectId, ref: 'experiences' }],
}, {
        timestamps: true,
        collection: 'customers',
        versionKey: false,
        strict: true
    })


module.exports = mongoose.model('customers', ObjectSchema)