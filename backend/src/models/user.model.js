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
            type: String
        },
        bio: {
            type: String
        },
        passward: {
            type: String,
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
                type : String,
                trim :true,
                lowercase :true
            }
        ],
        refreshToken : {
            type: String
        }
    },{
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("passward")){
        return next()
    }

    this.passward =  await bcrypt.hash(this.passward, 10)
    next()
})

userSchema.methods.isPasswardCorrect = async function(passward){
    return await bcrypt.compare(passward,this.passward)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id : this.id,
            email : this.email,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id : this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
// userSchema.methods.generateAccessToken = function() {
//     try {
//         const accessToken = jwt.sign(
//             {
//                 id: this.id,
//                 email: this.email,
//                 username: this.username
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             {
//                 expiresIn: ACCESS_TOKEN_EXPIRY
//             }
//         );
//         console.log("Access Token generated:", accessToken);
//         return accessToken;
//     } catch (error) {
//         console.error("Error generating Access Token:", error);
//         throw error; // or handle the error as per your requirement
//     }
// };

// userSchema.methods.generateRefreshToken = function() {
//     try {
//         const refreshToken = jwt.sign(
//             {
//                 id: this.id
//             },
//             process.env.REFRESH_TOKEN_SECRET,
//             {
//                 expiresIn: REFRESH_TOKEN_EXPIRY
//             }
//         );
//         console.log("Refresh Token generated:", refreshToken);
//         return refreshToken;
//     } catch (error) {
//         console.error("Error generating Refresh Token:", error);
//         throw error; // or handle the error as per your requirement
//     }
// };
export const User = mongoose.model("user",userSchema)