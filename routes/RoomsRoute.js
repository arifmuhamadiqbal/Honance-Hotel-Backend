import express from "express";
import multer from "multer";
import {
    getRooms,
    addRooms,
    deleteRoomById,
    updateRoomById,
    getRoomByID,
} from "../controller/RoomsController.js";

const roomsRoute = express.Router();

// multer configuration
let formatName = new Date().toISOString().slice(0, 10);

const storage = multer.diskStorage({
    destination: "../public/images",
    filename: function (req, file, callback) {
        callback(null, formatName + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage }).single("file");

roomsRoute.get("/rooms", getRooms);
roomsRoute.get("/roomid/:id_room", getRoomByID);
roomsRoute.post("/addRooms", upload, addRooms);
roomsRoute.delete("/rooms/delete/:id_room", deleteRoomById);
roomsRoute.put("/rooms/update/:id_room", updateRoomById);

roomsRoute.get("/mainscreen");

export default roomsRoute;
