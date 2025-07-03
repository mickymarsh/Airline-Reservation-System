import express from "express";

import {reserve} from "../controllers/reservationControl.js";
import {registeredbooking} from "../controllers/reservationControl.js"
import {guestbooking} from "../controllers/reservationControl.js"
import {getinfo} from "../controllers/reservationControl.js"
import { bookings } from "../controllers/reservationControl.js";
import { history } from "../controllers/reservationControl.js";

const router = express.Router()

router.post("/reservation", reserve)
router.post("/guest-booking", guestbooking)
router.post("/registered-booking", registeredbooking)
router.get("/user-info", getinfo)
router.get("/bookings", bookings)
router.get("/history", history)


export default router
