import express from "express";
import multer from "multer";
import { getRooms, addRoom, deleteRoomById, updateRoomById } from "../controller/RoomsController.js";

const roomsRoute = express.Router();

// upload room data to database
// multer configuration
let formatName = new Date().toISOString().slice(0, 10);

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, callback) {
    callback(null, formatName + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

roomsRoute.get("/rooms", getRooms);
roomsRoute.post("/addRoom", upload, addRoom);
roomsRoute.delete("/delete/:id_room", deleteRoomById);
roomsRoute.put("/update/:id_room", updateRoomById);

roomsRoute.get("/mainscreen");

 /*
roomsRoute.post("/addRoom",upload, async (req, res) => {
  let codeRoom = req.body.kodeKamar;
  let nameRoom = req.body.namaKamar;
  let descriptionRoom = req.body.deskripsiKamar;
  let priceRoom = req.body.hargaKamar;
  let photoRoom = formatName + "-" + req.body.filename;

  await Rooms.sequelize.query(
    `INSERT INTO rooms (room_code, room_name, room_description, room_price, room_photo)
    VALUES ("${codeRoom}", "${nameRoom}", "${descriptionRoom}", ${priceRoom}, "${photoRoom}");`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      console.log("Data berhasil dihapus !");
      return res.status(200).json(rows);
    }
  );
}); */


export default roomsRoute;
