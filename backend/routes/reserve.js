import express from "express";

import {reserve} from "../controllers/reservationControl.js";

const router = express.Router()

router.post("/reservation", reserve)

export default router
