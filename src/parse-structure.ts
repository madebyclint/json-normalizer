const logger = require('node-color-log');
const data1 = require('../data/private/merge-samples/bankAccountsResponseCore.json');
const data2 = require('../data/private/merge-samples/bankAccountsStructureCore.json');

interface ListObject {
    [key:string]: string;
}

function createSuperObjectFromArray(obj1: ListObject) {
    if (!Array.isArray(obj1)) {
        logger.error('This is not an array');
        return;
    }
    const holderObj: ListObject = obj1.reduce((acc, item) => {
        const count = Object.keys(item).length;
        logger.debug('item prop count', Object.keys(item).length);
        for (const prop in item) {
            logger.debug('prop an array?', prop, Array.isArray(item[prop]));
            logger.debug('prop an object?', prop, typeof item[prop]);
            if (!(prop in acc)) {
                acc[prop] = item[prop];
            }
        }
        return acc;
    }, {});
    return [holderObj];
}

logger.debug('new object', createSuperObjectFromArray(data1.accounts));

export {};