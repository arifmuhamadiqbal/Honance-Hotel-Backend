import express from "express";
import multer from "multer";
<<<<<<< HEAD
import { getRooms, getRoomById, addRoom, deleteRoomById, updateRoomById } from "../controller/RoomsController.js";
=======
import {
    getRooms,
    addRoom,
    deleteRoomById,
    updateRoomById,
    getRoomByID,
    searchRoom,
} from "../controller/RoomsController.js";
>>>>>>> 0dd5f69646504871ef31c376c64662f6673526d5
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
<<<<<<< HEAD
roomsRoute.post("/addRoom", upload, addRoom, addRoomFacilities);
roomsRoute.delete("/rooms/delete/:id_room", deleteRoomById);
roomsRoute.put("/rooms/update/:id_room", updateRoomById);
roomsRoute.get("/rooms/update/:id_room", getRoomById);
=======
roomsRoute.get("/roomid/:id_room", getRoomByID);
roomsRoute.get("/search/:range_harga", searchRoom);
roomsRoute.post("/tambahfasilitas", addRoomFacilities);
roomsRoute.post("/addRoom", upload, addRoom);
roomsRoute.delete("/delete/:id_room", deleteRoomById);
roomsRoute.put("/update/:id_room", updateRoomById);
>>>>>>> 0dd5f69646504871ef31c376c64662f6673526d5

roomsRoute.get("/mainscreen");

export default roomsRoute;
