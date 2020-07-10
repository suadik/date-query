'use strict';

const moment = require('moment');
const getMonth = require('./utils/get-month')
const getYear = require('./utils/get-year')
const startDate = require('./utils/start-date')
const endDate = require('./utils/end-date')
const dq = {};

const days = ['sun','mon','tue','wed','thu','fri','sat'];
const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

dq.get = {
    all: day => {

        if(day){
            if (typeof day !== 'string') {
                throw { error: 'day should be a string' };
            }

            if (day.length !== 3) {
                throw { error: 'day should be three characters' };
            }

            if (!days.includes(day)) {
                throw { error: 'invalid day provided, day format should be ie "tue"' };
            }
        }

        return {
            in: arg => {
                
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
                let fromRslt = []
                let fromDaysInYear = 0;
                

                let f = toDate => {
                    if (getMonth(fromDate) === undefined) {
                        let yrRange = ((Number(getYear(toDate)) - Number(getYear(fromDate))) * 12 + 12)
                        for (let a = 1; a <= yrRange; a++) {
                            fromDaysInYear += moment(`${getYear(fromDate)} - 0${a}`, "YYYY-MM").daysInMonth();
                        }
                        for (let i = 1; i < fromDaysInYear; i += 1) {
                            if (new Date(new Date(startDate(getYear(fromDate))).setDate(i)).getDay() === days.indexOf(day)) {
                                fromRslt.push(moment(new Date(new Date(startDate(getYear(fromDate))).setDate(i))).format('YYYY-MM-DD'));
                            }
                        }
                    }
                    return fromRslt
                }

                let g = (toDate) => {
                    if (getMonth(fromDate) !== undefined) {
                        if(getYear(toDate) !== getYear(fromDate)){

                            let yrRange = ((Number(getYear(toDate)) - Number(getYear(fromDate))) * 12 + 12)
                            
                            for (let a = months.indexOf(getMonth(fromDate)) + 1; a <= yrRange; a++) {
                                fromDaysInYear += moment(`${getYear(fromDate)} - 0${a}`, "YYYY-MM").daysInMonth();
                            }

                            for (let i = 1; i < fromDaysInYear; i += 1) {
                                
                                if (new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i)).getDay() === days.indexOf(day)) {
                                    fromRslt.push(moment(new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i))).format('YYYY-MM-DD'));
                                }
                            } 
                        }
                    }
                }

                return {
                    to: toDate => {
                        if(getYear(fromDate) > getYear(toDate)){
                            throw {error: 'Invalid date range'}
                        }
                        let toRslt = []
                        let toDaysInYear = 0;

                        if (getMonth(fromDate) === undefined && getMonth(toDate) !== undefined){
                            let yrRange = ((Number(getYear(toDate)) - Number(getYear(fromDate))) * 12 + 12)
                            console.log(getYear(fromDate))
                            for (let a = 1; a <= yrRange; a++) {
                                fromDaysInYear += moment(`${getYear(fromDate)} - 0${a}`, "YYYY-MM").daysInMonth();
                            }

                            for (let i = 1; i < fromDaysInYear; i += 1) {

                                if (new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i)).getDay() === days.indexOf(day)) {
                                    fromRslt.push(moment(new Date(new Date(new Date(startDate(getYear(fromDate)))).setDate(i))).format('YYYY-MM-DD'));
                                }
                            }
                            return fromRslt.filter(a => a <= endDate(months.indexOf(getMonth(toDate)), getYear(toDate)))
                        }

                        if (getMonth(fromDate) !== undefined && getMonth(toDate) === undefined) {
                            if (getYear(toDate) !== getYear(fromDate)) {

                                let yrRange = ((Number(getYear(toDate)) - Number(getYear(fromDate))) * 12 + 12)

                                for (let a = months.indexOf(getMonth(fromDate)) + 1; a <= yrRange; a++) {
                                    fromDaysInYear += moment(`${getYear(fromDate)} - 0${a}`, "YYYY-MM").daysInMonth();
                                }

                                for (let i = 1; i < fromDaysInYear; i += 1) {

                                    if (new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i)).getDay() === days.indexOf(day)) {
                                        fromRslt.push(moment(new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i))).format('YYYY-MM-DD'));
                                    }
                                }
                            } else {

                                for (let a = months.indexOf(getMonth(fromDate)) + 1; a <= 12; a++) {
                                    fromDaysInYear += moment(`${getYear(fromDate)} - 0${a}`, "YYYY-MM").daysInMonth();
                                }

                                for (let i = 1; i < fromDaysInYear; i += 1) {

                                    if (new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i)).getDay() === days.indexOf(day)) {
                                        fromRslt.push(moment(new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i))).format('YYYY-MM-DD'));
                                    }
                                }
                            }
                            return fromRslt;
                        }

                        if (getMonth(toDate) !== undefined) {

                            if (getYear(toDate) === getYear(fromDate)) {

                                if (months.indexOf(getMonth(fromDate)) > months.indexOf(getMonth(toDate))) {
                                    throw {error: 'Invalid date range'}
                                }

                                for (let a = months.indexOf(getMonth(fromDate)) + 1; a <= (months.indexOf(getMonth(toDate)) + 1); a++) {
                                    toDaysInYear += moment(`${getYear(fromDate)} - 0${months.indexOf(getMonth(fromDate)) + 1}`, "YYYY-MM").daysInMonth();
                                }

                                for (let i = 1; i < toDaysInYear; i += 1) {
                                    if (new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i)).getDay() === days.indexOf(day)) {
                                        toRslt.push(moment(new Date(new Date(new Date(startDate(getYear(fromDate))).setMonth(months.indexOf(getMonth(fromDate)))).setDate(i))).format('YYYY-MM-DD'));
                                    }
                                }
                                return toRslt;
                            } else {
                                
                                g(toDate)
                                return fromRslt.filter(a => a <= endDate(months.indexOf(getMonth(toDate)), getYear(toDate)))
                            }

                        } else {
                            f(toDate)
                        }

                        if(getMonth(fromDate) === undefined && getMonth(toDate) === undefined){
                            g(toDate)
                            return fromRslt;
                        }
                    }
                }
            },
            first: day => {
                console.log(day)
                return {
                    in: (arg) => {
                        if (getMonth(arg) !== undefined) {
                            let daysInMnth = moment(`${getYear(arg)} - 0${months.indexOf(getMonth(arg)) + 1}`, "YYYY-MM").daysInMonth();
                            let rslt = []
                            for (let i = 1; i < daysInMnth; i += 1) {
                                if (new Date(new Date(new Date(startDate(getYear(arg))).setMonth(months.indexOf(getMonth(arg)))).setDate(i)).getDay() === days.indexOf(day)) {
                                    console.log('...',months.indexOf(getMonth(arg)))
                                    rslt.push(moment(new Date(new Date(new Date(startDate(getYear(arg))).setMonth(months.indexOf(getMonth(arg)))).setDate(i))).format('YYYY-MM-DD'));
                                }
                            }
                            return rslt;
                        } else {
                            let daysInYear = 0;

                            for (let a = 1; a <= 12; a++) {
                                daysInYear += moment(`${getYear(arg)} - 0${a}`, "YYYY-MM").daysInMonth();
                            }

                            let rslt = []
                            for (let i = 1; i < daysInYear; i += 1) {
                                if (new Date(new Date(startDate(getYear(arg))).setDate(i)).getDay() === days.indexOf(day)) {
                                    console.log('...',months.indexOf(getMonth(arg)))
                                    rslt.push(moment(new Date(new Date(startDate(getYear(arg))).setDate(i))).format('YYYY-MM-DD'));
                                }
                            }
                            return rslt;
                        }
                    },
                    from: (fromDate) => {
                        console.log(fromDate)
                        return {
                            to: (toDate) => {
                                console.log(toDate)
                            }
                        }
                    }
                }
            },
            last: day => {
                console.log(day)
                return {
                    in: (args) => {
                        console.log(args)
                    },
                    from: (fromDate) => {
                        console.log(fromDate)
                        return {
                            to: (toDate) => {
                                console.log(toDate)
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = dq;