import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const houseSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        leak : {
            type : Boolean
        },
        flowrate :{
            type : Number
        },
        consumption : {
            type : Number
        },
        ward : {
            type : String
        }
        // username: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     lowercase: true,
        //     trim: true,
        //     index: true
        // },
        // email: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     trim: true,
        //     lowercase: true,
        // },
        // image: {
        //     type: String
        // },
        // bio: {
        //     type: String
        // },
        // passward: {
        //     type: String,
        //     required: true,
        //     trim: true
        // },
        // quizAttempts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "quiz"
        //     }
        // ],
        // serveyAttempts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "survey"
        //     }
        // ],
        // starQuiz: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "quiz"
        //     }
        // ],
        // starSurvey: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "survey"
        //     }
        // ],
        // blogs: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "blog"
        //     }
        // ],
        // intrests : [
        //     {
        //         type : String,
        //         trim :true,
        //         lowercase :true
        //     }
        // ],
        // refreshToken : {
        //     type: String
        // }
    },{
        timestamps: true
    }
)
export const house = mongoose.model("house",houseSchema)
