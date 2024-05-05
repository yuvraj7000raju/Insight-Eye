
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"


export const verifyJWT = asyncHandler(async(req, _,next)=>{
   try{
    const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if(!Token){
        throw new ApiError(401,"unauthorized request")
    }

    console.log("-------------------------------",  Token)

    const decodedToken = jwt.verify(Token , process.env.ACCESS_TOKEN_SECRET)

    console.log(decodedToken)
    
    const user = await User.findById(decodedToken?.id).select("-refreshToken -passward")

    if(!user){
        throw new ApiError(401,"invalid access token")
    }

    req.user = user

    next()
   }catch(error){
    throw new ApiError(401,error?.message || "invalid accessToken")

   }
    

}
)