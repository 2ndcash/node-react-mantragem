const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

function encrypt(data) {
    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
    return bcrypt.hashSync(data, salt)
}

function compare(data, encrypted) {
    return bcrypt.compareSync(data, encrypted)
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = { encrypt, compare, getRandomInt }