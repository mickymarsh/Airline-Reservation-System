import express from "express";
import {register} from "../controllers/registerControl.js";

const router = express.Router()

router.post("/Register", register)

export default router