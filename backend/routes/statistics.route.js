import express from "express";
import { getFlightClassDetails } from "../controllers/schedule.controller.js";

const router = express.Router();

// Route to get flight class details by flight number
router.post("/flight_class_details", getFlightClassDetails);

export default router;
