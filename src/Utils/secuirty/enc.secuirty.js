import crypto from "node:crypto";

const IV_LENGTH=16;
const ENC_SECRET_KEY="jujafrtkmnarfdetonjttramlpqtresj"; //32 bytes because AES-256 requires a 32-byte key



export const encryption=(text)=>{
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc",ENC_SECRET_KEY,iv);
    let encryptedData = cipher.update(text,"utf-8","hex");
    encryptedData+= cipher.final("hex");
    return `${iv.toString("hex")}:${encryptedData}`;

}


export const decryption=(encryptedData)=>{
    const [ivHex,encryptedText]=encryptedData.split(":");
    const binaryLikeIv=Buffer.from(ivHex,"hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc",ENC_SECRET_KEY,binaryLikeIv);
    let decryptedData = decipher.update(encryptedText,"hex","utf-8");
    decryptedData+=decipher.final("utf-8");
    return decryptedData;

}