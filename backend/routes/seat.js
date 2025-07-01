import express from "express";

import {getseatlist} from "../controllers/seatControl.js";

const router = express.Router()

router.get("/seatlist", getseatlist)

export default router
