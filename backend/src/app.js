import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes/user.router.js"


const app = express();

app.use(cors())

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded())

app.use(express.static("public"))

app.use(cookieParser())


app.use("/api/v1/users",router)

app.get("/home",(req,res)=>{
    res.status(200).json({
        home: "hello"
    })
})

export default app;