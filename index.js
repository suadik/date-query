'use strict';

const moment = require('moment');

const dq = {};

const days = ['sun','mon','tue','wed','thu','fri','sat'];
const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

const startDate = year => moment(year).startOf('month').format("YYYY-MM-DD");
const endDate = year => moment(year).add(11, 'months').endOf("month").format("YYYY-MM-DD");
const getMonth = arg => arg.split(' ').length > 1 ? arg.split(' ')[0] : undefined;
const getYear = arg => arg.split(' ').length > 1 ? arg.split(' ')[1] : arg.split(' ').length === 1 ? arg.split(' ')[0] : arg.split(' ')[0];

dq.get = {
    all: day => {

        if(typeof day !== 'string'){
            throw { error: 'day should be a string'};
        }

        if (day.length !== 3) {
            throw { error: 'day should be three characters' };
        }

        if (!days.includes(day)) {
            throw { error: 'invalid day provided, day format should be ie "tue"' };
        }

        return {
            in: arg => {
                
                let month = arg.split(' ').length > 1 ? arg.split(' ')[0] : undefined
                let year = arg.split(' ').length > 1 ? arg.split(' ')[1] : arg.split(' ').length === 1 ? arg.split(' ')[0] : arg.split(' ')[0]
                
                if(typeof getYear(arg) !== 'string'){
                    throw { error: 'year should be a string' };
                }

                if (getMonth(arg) && typeof getMonth(arg) !== 'string') {
                    throw { error: 'month should be a string' };
                }

                if(getMonth(arg) !== undefined){
                    let daysInMnth = moment(`${getYear(arg)} - 0${months.indexOf(getMonth(arg)) + 1}`, "YYYY-MM").daysInMonth();
                    let rslt = []
                    for (let i = 1; i < daysInMnth; i += 1) {
                        if (new Date(new Date(new Date(startDate(getYear(arg))).setMonth(months.indexOf(getMonth(arg)))).setDate(i)).getDay() === days.indexOf(day)) {
                            rslt.push(moment(new Date(new Date(new Date(startDate(getYear(arg))).setMonth(months.indexOf(getMonth(arg)))).setDate(i))).format('YYYY-MM-DD'));
                        }
                    }
                    return rslt;
                }else{
                    let daysInYear = 0;

                    for (let a = 1; a <= 12; a++) {
                        daysInYear += moment(`${getYear(arg)} - 0${a}`, "YYYY-MM").daysInMonth();
                    }

                    let rslt = []
                    for (let i = 1; i < daysInYear; i += 1) {
                        if (new Date(new Date(startDate(getYear(arg))).setDate(i)).getDay() === days.indexOf(day)) {
                            rslt.push(moment(new Date(new Date(startDate(getYear(arg))).setDate(i))).format('YYYY-MM-DD'));
                        }
                    }
                    return rslt;
                }
            },
            from: fromDate => {

                if (typeof getYear(fromDate) !== 'string') {
                    throw { error: 'year should be a string' };
                }

                if (getMonth(fromDate) && typeof getMonth(fromDate) !== 'string') {
                    throw { error: 'month should be a string' };
                }

                return {
                    to: toDate => {
                        if (typeof getYear(toDate) !== 'string') {
                            throw { error: 'year should be a string' };
                        }

                        if (getMonth(toDate) && typeof getMonth(toDate) !== 'string') {
                            throw { error: 'month should be a string' };
                        }

                        console.log(getMonth(fromDate), '', getYear(fromDate))
                    }
                }
            }
        }
    }
}

let a = dq.get.all('sun').from('2020').to('2019')
console.log(a)
module.exports = dq;