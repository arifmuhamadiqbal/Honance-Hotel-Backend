import express from "express";
import multer from "multer";
import {
    getRooms,
    addRoom,
    deleteRoomById,
    updateRoomById,
    getRoomByID,
    searchRoom,
} from "../controller/RoomsController.js";
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

roomsRoute.get("/rooms", getRooms);
roomsRoute.get("/roomid/:id_room", getRoomByID);
roomsRoute.get("/search/:range_harga", searchRoom);
roomsRoute.post("/tambahfasilitas", addRoomFacilities);
roomsRoute.post("/addRoom", upload, addRoom);
roomsRoute.delete("/delete/:id_room", deleteRoomById);
roomsRoute.put("/update/:id_room", updateRoomById);

roomsRoute.get("/mainscreen");

export default roomsRoute;
