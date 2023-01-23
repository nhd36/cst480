import { v4 as uuid } from 'uuid';

const createUniqueId = (): string => {
    const id = uuid();
    return id;
}

const verifyNonNull = (keys: Array<string>, obj: any): Boolean => {
    for (let key of keys) {
        console.log(key, obj.hasOwnProperty(key), obj[key], typeof obj[key])
        if (!obj.hasOwnProperty(key)) {
            return false;
        } else if (obj[key] === null || obj[key] === undefined) {
            return false;
        }
    }
    return true;
}

export { createUniqueId, verifyNonNull }