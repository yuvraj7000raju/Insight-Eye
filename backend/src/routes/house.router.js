import {Router} from "express";
import { findinvalid, registerhouse } from "../controllers/house.controller.js";

const router1 = Router()

router1.route("/rh").post(registerhouse)
router1.route("/invalid").post(findinvalid)

// router.route("/login").post(loginUser)
// router.route("/logout").post(verifyJWT, logoutUser)
export default router1
