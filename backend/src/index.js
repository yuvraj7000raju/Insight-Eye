import dotenv from "dotenv"
dotenv.config({
    path : '../.env'
})
import app from "./app.js"
import mongoose from "mongoose"


(
  async()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE}`)
    app.listen(process.env.PORT , ()=>{
        console.log(`app is listning on port : ${process.env.PORT}`)
    })
    }catch(error){
        console.log("error here --------")
        console.log(error)
        throw error
    }
  }
)()



