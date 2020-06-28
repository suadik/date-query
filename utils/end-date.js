'use strict';

const moment = require('moment');
const endDate = (month, year) => moment(year).add(month, 'months').endOf("month").format("YYYY-MM-DD");

module.exports = endDate;