import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const invalidschema = new Schema(
    {
        data: {
            type: String,
            required: true
        },
        ward : {
            type : String
        }
       
    },{
        timestamps: true
    }
)
export const invalid = mongoose.model("invalid",invalidschema)
