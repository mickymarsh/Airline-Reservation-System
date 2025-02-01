

import express from "express";
import { signInUser, signUpUser,signOutUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signUpUser", signUpUser);
router.post("/signInUser", signInUser);
router.post("/signOutUser", signOutUser);

export default router;

