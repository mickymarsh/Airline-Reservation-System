import express from "express";
import {search} from "../controllers/searchControl.js";
import {getFlightId} from "../controllers/searchControl.js";

const router = express.Router()

router.get("/search", search)
router.get("/getFlightId", getFlightId)


export default router