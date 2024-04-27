
import {  User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req,res)=>{
   const{Name, username ,email, passward, intrests} = req.body
console.log(req.body)
   if(
    [Name, username ,email, passward].some((field)=>{
        return field?.trim() === ""
    })
   ){
    throw new ApiError(400,"all fields are required")
   }
   
   const existedUser = await User.findOne({
    $or : [{username},{email}]
   })

   if(existedUser){
    throw new ApiError(409,"user with email or username already existed")
   }

   const imageLocalPath = req.file.path;
   if(!imageLocalPath){
    console.log(req.file);
    console.log("nooooooooooooooooooooo")
    console.log(req.file)
   }

  const image = await uploadOnCloudinary(imageLocalPath)
  
  const user = await User.create({
    Name,
    username : username.toLowerCase(),
    email,
    passward,
    intrests : intrests || "add",
    image : image?.url || ""

  })

  const createdUser = await User.findById(user._id).select(
    "-passward -refreshToken" 
  )
if(!createdUser){
    throw new ApiError(500, "something went wrong while resistering user")
}
return res.status(200).json(
    new ApiResponse(200,createdUser,"user created successfully")
)

}
)

const loginUser = asyncHandler(async(req,res)=>{
     const {username,email,passward} = req.body
     console.log(req.body)

     if(!email || !username){
      throw new ApiError(400,"no email or username is given")
     }

     const user = await User.findOne({
      $or :[{username} , {email}]
     })

     if(!user){
      throw new ApiError(404,"User not found")
    }
    
    console.log(user)
     
     const isPasswardValid = await user.isPasswardCorrect(passward)

     if( !isPasswardValid ){
      throw new ApiError(400,"passward is not matched !")
     }
     
     console.log(username)

     
     console.log(user)

     res.status(200).json(
      new ApiResponse(200,user,"User is loged in sussesfully")
     )
})


export {
    registerUser,
    loginUser
}
