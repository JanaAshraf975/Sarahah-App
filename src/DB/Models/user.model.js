import mongoose from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../Utils/enums/user.enums.js";


const userSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            minLength:3,
            MaxLength:25
        },
        lastName:{
            type:String,
            minLength:3,
            MaxLength:25
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true
        },
        confrimEmail:Date,
        password:{
            type:String,
            required: function(){
                return this.provider===providerEnum.SYSTEM
            }
        },
        DOB:Date,
        gender:{
            type:Number,
            enum:Object.values(genderEnum),
            default:genderEnum.MALE
        },
        role:{
            type:Number,
            enum:Object.values(roleEnum),
            default:roleEnum.USER
        },
        phone:String,
        provider:{
            type:Number,
            enum:Object.values(providerEnum),
            default:providerEnum.SYSTEM
        },
        profilePic:String

    },{
        timestamps:true,toObject:{virtuals:true},toJSON:{virtuals:true}
//  ```js
// // toObject: Converts the Mongoose document into a normal JavaScript object.

// // toJSON: Converts the Mongoose document into JSON when sending a response.
// ```

    }

)
 //this is not a real db field  its a virtual field
userSchema.virtual("userName").set(function(value){
    const [firstName,lastName]=value?.split(" ")||[]
    this.set({firstName,lastName})
}).get(function(){
    return this.firstName + " " + this.lastName;
})

const userModel = mongoose.model("user", userSchema)
export default userModel;