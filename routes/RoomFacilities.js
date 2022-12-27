import express from "express";
import { addRoomFacilities, deleteRoomFacilitiesById, getRoomFacilities, getRoomFacilitiesById, updateRoomFacilitiesById } from "../controller/RoomFacilitiesController.js";

const roomFacRoute = express.Router();

// routes
roomFacRoute.get("/getRoomFacilities", getRoomFacilities);
roomFacRoute.post("/addRoomFacilities", addRoomFacilities);
roomFacRoute.get("/getRoomFacilitiesById/:id_room", getRoomFacilitiesById);
roomFacRoute.put("/updateRoomFacilities/:id_room", updateRoomFacilitiesById);
roomFacRoute.delete("/deleteRoomFacilities/:id_room", deleteRoomFacilitiesById);

export default roomFacRoute;