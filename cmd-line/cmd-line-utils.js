/* global module */

'use strict';

module.exports = {
    printOut
};

function printOut(data) {
    console.log(typeof data === 'string' ? data : JSON.stringify(data));
}
