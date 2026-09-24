import jwt from "jsonwebtoken";
import { roleEnum } from "../enums/user.enums.js";
import {
    ACCESS_TOKEN_EXPIRES_IN_ADMIN,
    ACCESS_TOKEN_EXPIRES_IN_USER,
    ADMIN__ACCESS_TOKEN,
    ADMIN_REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRES_IN_ADMIN,
    REFRESH_TOKEN_EXPIRES_IN_USER,
    USER_ACCESS_TOKEN,
    USER_REFRESH_TOKEN
} from "../../../config/config.service.js";


export const generateToken = ({ payload, secert_key, options }) => {
    return jwt.sign(payload, secert_key, options);
};


export const verifyToken = ({ token, secert_key }) => {
    return jwt.verify(token, secert_key);
};


export const getSignature = ({ role = roleEnum.USER }) => {

    let signatures = {
        accessSignature: undefined,
        refreshSignature: undefined
    };

    switch (role) {

        case roleEnum.USER:
            signatures.accessSignature = USER_ACCESS_TOKEN;
            signatures.refreshSignature = USER_REFRESH_TOKEN;
            break;

        case roleEnum.ADMIN:
            signatures.accessSignature = ADMIN__ACCESS_TOKEN;
            signatures.refreshSignature = ADMIN_REFRESH_TOKEN;
            break;

        default:
            throw BadRequestException({
                message: "Invalid role!"
            });
    }

    return signatures;
};


export const getLoginCredentials = async (user) => {

    const signatures = getSignature({
        role: user.role
    });

    const accessToken = generateToken({
        payload: {
            _id: user._id
        },
        secert_key: signatures.accessSignature,
        options: {
            expiresIn:
                user.role != roleEnum.ADMIN
                    ? ACCESS_TOKEN_EXPIRES_IN_USER
                    : ACCESS_TOKEN_EXPIRES_IN_ADMIN
        }
    });

    const refreshToken = generateToken({
        payload: {
            _id: user._id
        },
        secert_key: signatures.refreshSignature,
        options: {
            expiresIn:
                user.role != roleEnum.ADMIN
                    ? REFRESH_TOKEN_EXPIRES_IN_USER
                    : REFRESH_TOKEN_EXPIRES_IN_ADMIN
        }
    });

    return {
        accessToken,
        refreshToken
    };
};