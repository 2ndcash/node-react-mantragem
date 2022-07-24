const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RunningSchema = new Schema({
    year: { type: String, required: true, maxlength: 4 },
    month: { type: String, required: true, maxlength: 2 },
    running_number: { type: Number, required: true, default: 1 }
}, {
        timestamps: true,
        collection: 'customer_runnings',
        versionKey: false,
        strict: true
    },
)

module.exports = mongoose.model('customer_runnings', RunningSchema)