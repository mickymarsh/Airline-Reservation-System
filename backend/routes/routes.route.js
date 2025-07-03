

import express from "express";
import { insertNewRoute} from "../controllers/routes.controller.js";


const router = express.Router();

router.post("/addRoute", insertNewRoute);

export default router;

