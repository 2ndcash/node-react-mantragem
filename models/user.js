const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const { Schema } = mongoose;
const config = require('config')

const UsersSchema = new Schema({
    picture: { type: Schema.Types.ObjectId, ref: 'images' },
    email: { type: String, required: true, unique: true, },
    tax_id: Number,
    business_type: Number,
    company_name: String,
    map_url: String,
    prefix: String,
    first_name: String,
    last_name: String,
    phone_no: String,
    mobile_no: String,
    career: String,
    introduce_yourself: String,
    referrer_email: String,
    account: String,
    youtube: String,
    soundcloud: String,
    facebook: String,
    line: String,
    instagram: String,
    tweeter: String,
    tiktok: String,
    interests: [{ type: String }],
    role: String,
    hash: String,
    salt: String,
    token: String,
    refreshToken: String,
    verifyCode: String,
    active: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
}, {
        timestamps: true,
        collection: 'users',
        versionKey: false,
        strict: true
    }
)

UsersSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password + this.email, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password + this.email, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.setJWT = function (refreshToken) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 30);

    const secret = this.hash + this.salt + config.get('jwt').salt
    const exp = parseInt(expirationDate.getTime() / 1000, 10)

    this.token = jwt.sign({ id: this._id, exp: exp }, secret);
    if (!refreshToken) this.refreshToken = randtoken.uid(256)
    if (!this.active) this.verifyCode = randtoken.uid(128)
}

module.exports = mongoose.model('users', UsersSchema)