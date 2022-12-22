import express from "express";
import { addFacilities, getFacilities } from "../controller/FacilitiesController.js";

const facilitiesRoute = express.Router();

facilitiesRoute.get("/facilities", getFacilities);
facilitiesRoute.post("/addFacilities", addFacilities)

export default facilitiesRoute;
