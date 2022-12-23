import express from "express";
import multer from "multer";
import { getRooms, getRoomById, addRoom, deleteRoomById, updateRoomById } from "../controller/RoomsController.js";
import { addRoomFacilities } from "../controller/RoomFacilitiesController.js";

const roomsRoute = express.Router();

// multer configuration
let formatName = new Date().toISOString().slice(0, 10);
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, callback) {
    callback(null, formatName + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");
// end multer configuration

// routes
roomsRoute.get("/rooms", getRooms);
roomsRoute.post("/addRoom", upload, addRoom, addRoomFacilities);
roomsRoute.delete("/rooms/delete/:id_room", deleteRoomById);
roomsRoute.put("/rooms/update/:id_room", updateRoomById);
roomsRoute.get("/rooms/update/:id_room", getRoomById);

roomsRoute.get("/mainscreen");


export default roomsRoute;
