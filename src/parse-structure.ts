const logger = require('node-color-log');
const data1 = require('../data/private/merge-samples/bankAccountsResponseCore.json');
const data2 = require('../data/private/merge-samples/bankAccountsStructureCore.json');

interface ListObject {
    [key:string]: string;
}

function createSingleObjectFromArray(obj1: ListObject) {
    if (!Array.isArray(obj1)) {
        logger.error('This is not an array');
        return;
    }
    const holderObj: ListObject = obj1.reduce((acc, item) => {
        for (const prop in item) {
            if (!(prop in acc)) {
                acc[prop] = item[prop];
            }
        }
        return acc;
    }, {});
    const count = Object.keys(holderObj).length;
    logger.debug('holderObj prop count', Object.keys(holderObj).length);
    return holderObj;
}

function createSuperObjectFromObjects(obj1: ListObject, obj2: ListObject) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const count1 = obj1Keys.length;
    const count2 = obj2Keys.length;
    const orderBySize = [
        count1 > count2 ? obj1 : obj2,
        count1 < count2 ? obj1 : obj2
    ]
    
    logger.debug('prop count obj1', count1);
    logger.debug('prop count obj2', count2);

    const orderedObjKeys1 = Object.keys(orderBySize[0]);
    const orderedObjKeys2 = Object.keys(orderBySize[1]);
    logger.debug('order by size', orderedObjKeys1.length, orderedObjKeys2.length);

    const missingProps1 = orderedObjKeys1.reduce((acc: string[], prop) => {
        if (!(prop in orderBySize[1])) {
            acc.push(prop);
        }
        return acc;
    }, []);

    const missingProps2 = orderedObjKeys2.reduce((acc: string[], prop) => {
        if (!(prop in orderBySize[0])) {
            acc.push(prop);
        }
        return acc;
    }, []);

    const allProps = [...new Set([...orderedObjKeys1, ...orderedObjKeys2])].sort();
    // logger.debug('all props', allProps.length, allProps);

    const resultObj = allProps.reduce((acc: ListObject, prop) => {
        if (!orderBySize[0][prop] || orderBySize[0][prop] === null) {
            acc[prop] = orderBySize[1][prop];
        } else {
            acc[prop] = orderBySize[0][prop];
        }
        return acc;
    }, {});

    const finalObj = orderedObjKeys1.reduce((acc: ListObject, prop) => {
        if (!(prop in orderBySize[1])) {
            missingProps1.push(prop);
        }
        const obj1Val = orderBySize[0][prop];
        const obj2Val = orderBySize[1][prop];
        let finalVal = obj2Val || obj1Val;
        acc[prop] = finalVal;

        missingProps2.forEach((missingProp) => {
            acc[missingProp] = orderBySize[1][missingProp];
        });
        return acc;
    }, {});

    // logger.debug('missing props from 2nd object', missingProps1);
    // logger.debug('missing props from 1st object', missingProps2);
    logger.debug('final obj', `(${Object.keys(finalObj).length} keys)`, finalObj);
    logger.debug('result obj', `(${Object.keys(resultObj).length} keys)`, resultObj);

    return finalObj;
}

const superObj1 = createSingleObjectFromArray(data1.accounts);
const superObj2 = createSingleObjectFromArray(data2.accounts);
const missingProps = createSuperObjectFromObjects(superObj1, superObj2);




export {};