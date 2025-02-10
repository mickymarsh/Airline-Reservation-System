

import express from "express";
import { signInAdmin, signUpAdmin,signOutAdmin,getUserName} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Import middleware


const router = express.Router();

router.post("/signUpAdmin", signUpAdmin);
router.post("/signInAdmin", signInAdmin);
router.post("/signOutAdmin", signOutAdmin);
router.get('/getUserName',verifyToken,getUserName)

export default router;

