const logger = require('node-color-log');
const data = require('../data/private/sample.json');

logger.debug(data);

interface ListObject {
    [key:string]: string;
}

function mergeObject(obj1: ListObject, obj2: ListObject) {
    logger.debug('obj1', obj1);
    logger.debug('obj2', obj2);
    return Object.assign({}, obj1, obj2);
}

logger.debug('new object', mergeObject(data.data.payees[0], data.data.payees[1]));

export {};