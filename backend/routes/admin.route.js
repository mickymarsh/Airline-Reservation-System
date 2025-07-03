

import express from "express";
import { insertNewRoute} from "../controllers/routes.controller.js";
import { insertNewAircraft,updateLastServiceDate  } from "../controllers/aircraft.controller.js";


const router = express.Router();

router.post("/addRoute", insertNewRoute);
router.post("/addAircraft", insertNewAircraft);
router.post("/updateAircraftServiceDate", updateLastServiceDate);
router.post("/addAircraft", insertNewAircraft);



export default router;

