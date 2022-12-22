import express from "express";
import multer from "multer";
import { getRooms, addRoom, deleteRoomById, updateRoomById } from "../controller/RoomsController.js";

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
roomsRoute.post("/addRoom", upload, addRoom);
roomsRoute.delete("/delete/:id_room", deleteRoomById);
roomsRoute.put("/update/:id_room", updateRoomById);

roomsRoute.get("/mainscreen");


export default roomsRoute;
