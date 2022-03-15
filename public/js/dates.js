const moment = require('moment');

module.exports.formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
}

module.exports.formatTime = (time) => {
    return moment(time).format("hh:mm:ss a");
}

