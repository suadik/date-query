'use strict';

const getMonth = arg => {
    if (typeof arg !== 'string') {
        throw { error: 'arg should be a string' };
    }
    return arg.split(' ').length > 1 ? arg.split(' ')[0] : undefined;
};

module.exports =  getMonth;