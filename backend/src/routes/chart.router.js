import {Router} from "express";
import { registerside, findside, registerwater, findwater } from "../controllers/chart.controler.js";

const router2 = Router()

router2.route("/rs").post(registerside)
router2.route("/side").post(findside)
router2.route("/rw").post(registerwater)
router2.route("/water").post(findwater)
// router.route("/login").post(loginUser)
// router.route("/logout").post(verifyJWT, logoutUser)
export default router2
