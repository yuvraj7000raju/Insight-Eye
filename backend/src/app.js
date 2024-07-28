import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes/user.router.js"
import router1 from "./routes/house.router.js";
import router2 from "./routes/chart.router.js";


const app = express();

app.use(cors())

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    console.log(req.body);
    next();
})

app.use(express.static("public"))

app.use(cookieParser())


app.use("/api/v1/users",router)
app.use("/api/v1/house",router1)
app.use("/api/v1/chart",router2)

app.get("/home",(req,res)=>{
    res.status(200).json({
        home: "hello"
    })
})

export default app;