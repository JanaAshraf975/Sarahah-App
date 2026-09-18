import {hash,compare} from "bcrypt";
import * as argon2 from "argon2";
// import {hash,verify} from "argon2";
import { hashEnums } from "../enums/hash.enums.js";
import {SALT_ROUNDS} from "../../../config/config.service.js";
import { BadRequestException } from "../response/error.response.js";


export const generateHash=async({plaintext,saltRounds=Number(SALT_ROUNDS),algorithm=hashEnums.BCRYPT})=>{
    let hashResult =""
    switch(algorithm){
        case hashEnums.BCRYPT:
            hashResult = await hash(plaintext,SALT_ROUNDS);
            break;
        case hashEnums.ARGON2:
            hashResult = await argon2.hash(plaintext);
            break;
        default: throw BadRequestException("algorithm is not supported!");
    }
    return hashResult;

}


export const compareHash=async({plaintext,hashedText,algorithm=hashEnums.BCRYPT})=>{
    let match = "";
    switch(algorithm){
        case hashEnums.BCRYPT:
            match = await compare(plaintext,hashedText);
            break;
        case hashEnums.ARGON2:
            match = await argon2.verify(hashedText,plaintext);
            break;
         default: throw BadRequestException("algorithm is not supported!");

    }
    return match;
}

