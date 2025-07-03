

import express from "express";
import { insertNewRoute} from "../controllers/routes.controller.js";
import { insertNewAircraft,updateLastServiceDate  } from "../controllers/aircraft.controller.js";
import { getFlightCount } from "../controllers/schedule.controller.js";
import { addFlightFunction } from "../controllers/schedule.controller.js";


const router = express.Router();

router.post("/addRoute", insertNewRoute);
router.post("/addAircraft", insertNewAircraft);
router.post("/updateAircraftServiceDate", updateLastServiceDate);
router.post("/addAircraft", insertNewAircraft);
router.post("/addFlight", addFlightFunction);
router.get("/getFlightCount",getFlightCount);


export default router;

