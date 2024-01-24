import { Schema ,model } from "mongoose";
import { systemRoles } from "../../SRC/utils/system.role.js";
const userSchema=new Schema(
    {
      userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isConfirmed: {
        type: Boolean,
        required: true,
        default: false,
      },
      role: {
        type: String,
        default: systemRoles.foodie,
        required:true,
        enum: [systemRoles.cheef, systemRoles.foodie],
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
          type: String,
          required: true,
        },
      gender: {
        type: String,
        default: 'Not specified',
        enum: ['male', 'female', 'Not specified'],
      },
      age: Number,
      token: String,
      forgetCode: String,
    },{
    timestamps:true
})
export const userModel=model('user',userSchema)