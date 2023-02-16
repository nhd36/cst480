import { v4 as uuid } from 'uuid';
import jwt, { JsonWebTokenError, JwtPayload, SignOptions } from "jsonwebtoken";

const secretKey = "SecretVaiLon";

const createUniqueId = (): string => {
    const id = uuid();
    return id;
}

const verifyNonNull = (keys: Array<string>, obj: any): Boolean => {
    for (let key of keys) {
        if (!obj.hasOwnProperty(key)) {
            return false;
        } else if (obj[key] === null || obj[key] === undefined) {
            return false;
        }
    }
    return true;
}

const signData = (data: string): string => {
    let jwtOptions: SignOptions = {
        algorithm: "HS256",
        expiresIn: "6h"
    }
    return jwt.sign(data, secretKey);
}

const parseToken = (token: string): string | null | JwtPayload => {
    try {
        const parseData: JwtPayload | string = jwt.verify(token, secretKey);
        return parseData;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}

export { createUniqueId, verifyNonNull, parseToken, signData }