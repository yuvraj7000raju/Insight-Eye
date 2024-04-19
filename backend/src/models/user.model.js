import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: string
        },
        bio: {
            type: string
        },
        passward: {
            type: string,
            required: true,
            trim: true
        },
        quizAttempts: [
            {
                type: Schema.Types.ObjectId,
                ref: "quiz"
            }
        ],
        serveyAttempts: [
            {
                type: Schema.Types.ObjectId,
                ref: "survey"
            }
        ],
        starQuiz: [
            {
                type: Schema.Types.ObjectId,
                ref: "quiz"
            }
        ],
        starSurvey: [
            {
                type: Schema.Types.ObjectId,
                ref: "survey"
            }
        ],
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: "blog"
            }
        ],
        intrests : [
            {
                type : string,
                trim :true,
                unique :true,
                lowercase :true
            }
        ]
    },{
        timestamps: true
    }
)

userSchema.pre("save", (next)=>{
    if(! this.Modified("passward")){
        return next()
    }

    this.passward = bcrypt.hase(this.passward, 10)
    next()
})

userSchema.method.isPasswardCorrect = async function(passward){
    return await bcrypt.compare(passward,this.passward)
}


export const user = mongoose.model("user",userSchema)