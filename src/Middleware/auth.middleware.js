
import { model } from "mongoose";
import { findById } from "../DB/database.reposatory.js";
import { tokenTypeEnum } from "../Utils/enums/token.enums.js";
import { roleEnum } from "../Utils/enums/user.enums.js";
import { getSignature, verifyToken } from "../Utils/tokens/token";
import userModel from "../DB/Models/user.model.js";
import { NotFoundException } from "../Utils/response/error.response.js";

export const decodedToken = async ({
    authentication,
    tokenType = tokenEnum.ACCESS,
}) => {
    const [Bearer, token] = authentication.split(" ") || [];

    // Get the appropriate signature based on the user role
    const signature = await getSignature({
        role: Bearer == "ADMIN" ? roleEnum.ADMIN : roleEnum.USER,
    });

    // Verify the token using the appropriate access/refresh signature
    const decode = verifyToken({
        token,
        secret_key:
            tokenType == tokenEnum.ACCESS
                ? signature.accessSignature
                : signature.refreshSignature,
    });

    const user = await findById({
        modelName: userModel,
        id: { _id: decode.id },
    });

    if (!user) {
        throw NotFoundException({
            message: "User not found!",
        });
    }

    return { user, decode };
};

export const authentication = (
    tokenType = tokenTypeEnum.ACCESS
) => {
    return async (req, res, next) => {
        const { user, decode } = decodedToken({
            authentication: req.headers.authorization,
            tokenType,
        });

        req.user = user;
        req.decode = decode;

        next();
    };
};

