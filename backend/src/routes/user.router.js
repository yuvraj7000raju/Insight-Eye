import {Router} from "express";
import { registerUser , loginUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(upload.single('image') ,registerUser)
router.route("/login").post(loginUser)
export default router