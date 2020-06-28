'use strict';

const getYear = arg => {
    if (typeof arg !== 'string') {
        throw { error: 'arg should be a string' };
    }
    return arg.split(' ').length > 1 ? arg.split(' ')[1] : arg.split(' ').length === 1 ? arg.split(' ')[0] : arg.split(' ')[0];
};

module.exports = getYear;