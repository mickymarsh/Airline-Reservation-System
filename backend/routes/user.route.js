

import express from "express";
import { signInAdmin, signUpAdmin,signOutAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signUpAdmin", signUpAdmin);
router.post("/signInAdmin", signInAdmin);
router.post("/signOutAdmin", signOutAdmin);

export default router;

