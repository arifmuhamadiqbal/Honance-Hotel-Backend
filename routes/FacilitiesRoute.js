import express from "express";
import { addFacilities, deleteFacilitiesById, getFacilities } from "../controller/FacilitiesController.js";

const facilitiesRoute = express.Router();

facilitiesRoute.get("/facilities", getFacilities);
facilitiesRoute.post("/addFacilities", addFacilities)
facilitiesRoute.delete("/deleteFacilities/:id_facilities", deleteFacilitiesById);

export default facilitiesRoute;
