const moment = require('moment')
require('twix')

const checkNationalID = (id) => {

    if (!id) {
        return false
    }

    if (typeof id !== 'string' || !id instanceof String) {
        id = id.toString()
    }

    if (id.length != 13) return false;

    for (i = 0, sum = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i);

    if ((11 - sum % 11) % 10 != parseFloat(id.charAt(12))) return false;

    return true;
}

const numberWithCommas = (n) => {
    var parts = n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

const getPhonePattern = (phone, separate) => {
    separate = separate || '-'
    phone = phone.toString()
    let bkk = phone.startsWith("02", 0)
    if (phone.length === 9 && bkk) {
        return phone.replace(/(\d{2})(\d{3})(\d{4})/, `$1${separate}$2${separate}$3`)
    }
    else if (phone.length === 9 && !bkk) {
        return phone.replace(/(\d{3})(\d{3})(\d{3})/, `$1${separate}$2${separate}$3`)
    }
    else if (phone.length === 10) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, `$1${separate}$2${separate}$3`)
    }
}

const momentTwixRangeTH = (fromDate, toDate) => {

    try {

        moment.locale('th')

        let start = moment(fromDate).add(543, 'years')
        let end = moment(toDate).add(543, 'years')

        return start.twix(end, {
            allDay: true
        }).format({
            hideTime: true,
            monthFormat: "MMMM"
        })

    } catch (error) {
        throw error
    }
}

const getGenderTH = (gender) => {
    let g = ''
    switch (gender) {
        case 'male':
            g = 'ชาย'
            break
        case 'female':
            g = 'หญิง'
            break
        default:
            g = 'ไม่ทราบเพศ'
            break
    }

    return g
}

const compare = (a, b) => {
    if (a.index < b.index) {
        return -1;
    }
    if (a.index > b.index) {
        return 1;
    }
    return 0;
}

module.exports = {
    getGenderTH,
    checkNationalID,
    numberWithCommas,
    getPhonePattern,
    momentTwixRangeTH,
    compare
}