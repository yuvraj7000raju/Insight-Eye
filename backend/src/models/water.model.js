import mongoose, { Schema } from "mongoose"

const waterschema = new Schema(
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
export const water = mongoose.model("water",waterschema)
