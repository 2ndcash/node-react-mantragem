const CustomerModelRunning = require('../models/customer_running')

const customer_running = async () => {
    const year = getYear2Digit()
    const month = getMonth()
    const day = getDay()

    let running = await CustomerModelRunning.findOne({ year: year, month: month, running_number: { $gte: 0 } })
    let running_number = 1
    if (running) {
        running.running_number = running.running_number + 1
        running_number = running.running_number
        await CustomerModelRunning.findById(running._id.toString()).update(running)
    }
    else {
        await CustomerModelRunning.create({ year: year, month: month, running_number: running_number })
    }

    //2109GEM001
    return pad(running_number, 3, `${year}${month}GEM`)
}

const pad = (num, size, format) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return `${format}${s}`;
}

const getYear2Digit = () => {
    return new Date().getFullYear().toString().substring(2,4)
}

const getMonth = () => {
    let month = new Date().getMonth()
    month = (month + 1)
    return month.toString().length == 1 ? `0${month.toString()}` : month.toString()
}

const getDay = () => {
    const dt = new Date()
    return dt.getDate().toString().length == 1 ? `0${dt.getDate().toString()}` : dt.getDate().toString()
}

module.exports = {
    customer_running
}