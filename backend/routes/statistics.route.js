import express from "express";
import { getFlightClassDetails,getChildPassengerIDs } from "../controllers/schedule.controller.js";

const router = express.Router();

// Route to get flight class details by flight number
router.post("/flight_class_details", getFlightClassDetails);
router.post("/flight_children_ids", getChildPassengerIDs);

export default router;
