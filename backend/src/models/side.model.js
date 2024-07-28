import mongoose, { Schema } from "mongoose"

const sideschema = new Schema(
    {
        date: {
            type: String,
            
        },
        data :{
            type: String,
        }
       
    },{
        timestamps: true
    }
)
export const side = mongoose.model("side",sideschema)
