'use strict';

const moment = require('moment');
const startDate = year => moment(year).startOf('month').format("YYYY-MM-DD");

module.exports = startDate;