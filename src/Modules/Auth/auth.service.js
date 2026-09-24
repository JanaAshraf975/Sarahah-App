import { create, findOne } from "../../DB/database.reposatory.js";
import userModel from "../../DB/Models/user.model.js";
import { hashEnums } from "../../Utils/enums/hash.enums.js";
import { BadRequestException, conflictException, NotFoundException } from "../../Utils/response/error.response.js";
import { encryption } from "../../Utils/secuirty/enc.secuirty.js";
import { compareHash, generateHash } from "../../Utils/secuirty/hash.secuirty.js";
import SuccessResponse from "../../Utils/response/success.response.js";
import { getLoginCredentials } from "../../Utils/tokens/token.js";


export const signUp = async (req, res) => {

    const { userName, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await findOne({
        model: userModel,
        filter: { email }
    });

    if (existingUser) {
        conflictException("User already exists");
    }

    // Hash password
    const hashedPassword = await generateHash({
        plaintext: password,
        algorithm: hashEnums.Argon2
    });

    // Encrypt phone number
    const encryptedPhone = encryption(phone);

    // Create user
    const user = await create({
        model: userModel,
        data: [{
            userName,
            email,
            password: hashedPassword,
            phone: encryptedPhone,
            role
        }]
    });

    return SuccessResponse({
        res,
        statusCode: 201,
        message: "User Created Successfully!",
        data: { user }
    });
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findOne({
    model: userModel,
    filter: { email },
  });

  if (!user) {
    throw NotFoundException({
      message: "Email not found!",
    });
  }

  const isMatch = await compareHash({
    plaintext: password,
    hashedText: user.password,
    algorithm: hashEnums.BCRYPT,
  });

  if (!isMatch) {
    throw BadRequestException({
      message: "Invalid password!",
    });
  }

  const token = await getLoginCredentials(user);

  return SuccessResponse({
    res,
    status: 200,
    message: "Login successfully",
    data: { token },
  });
}; 

