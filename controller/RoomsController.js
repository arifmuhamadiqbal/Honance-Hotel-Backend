import Rooms from "../models/RoomsModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// get all room
export const getRooms = async (req, res) => {
    try {
        let response = await Rooms.findAll();
        if (!response) return res.status(404).json({ msg: "Data Not Found !" });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// upload room data to database
// multer configuration
/* let formatName = new Date().toISOString().slice(0, 10);

const storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, callback) {
        callback(null, formatName + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage }).single("file");

roomsRoute.post("/addRoom", upload, async (req, res) => {
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

// add Room
export const uploadMulter = async (req, res) => {
    let formatName = new Date().toISOString().slice(0, 10);

    const storage = multer.diskStorage({
        destination: "./public/images",
        filename: function (req, file, callback) {
            callback(null, formatName + "-" + file.originalname);
        },
    });
    multer({ storage: storage }).single("file");
}

export const addRoom = async (req, res) => {
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
}

// delete room
export const deleteRoomById = async (req, res) => {
    try {
        const id = req.params.id_room;
        const rooms = await Rooms.destroy({
            where: {
                id_room: id,
            },
        });
        // ambil gambar spesifik
        const filePath = `./public/images/${rooms.room_photo}`;
        // hapus gambar
        fs.unlinkSync(filePath);
        // hapus dari DB
        await rooms.save();
        return res.json({ msg: "Room deleted !" });
    } catch (error) {
        return res.status(500).json({ error: `Error ! cannot delete : ${error}` });
    }
};

// update room
export const updateRoomById = async (req, res) => {
    const rooms = await Rooms.findOne({
        where: {
            id_room: req.params.id_room,
        }
    });
    if (!rooms) return res.status(404).json({ msg: "Data not found !" });
    let fileName = "";
    if (req.files === null) {
        fileName = rooms.room_photo;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedExt = [".jpg", ".png", ".jpeg"];

        if (!allowedExt.includes(ext.toLocaleLowerCase()))
            return res.status(442).json({ msg: "Image extension not allowed" });
        if (fileSize > 5000000)
            return res.status(442).json({ msg: "Image must be less than 5 MB" });

        const filePath = `./public/images/${rooms.room_photo}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const { room_code, room_name, room_description, room_price } = req.body;
    try {
        await Rooms.findOne({
            where: {
                id_room: req.params.id_room
            }
        });
        rooms.room_code = room_code;
        rooms.room_name = room_name;
        rooms.room_description = room_description;
        rooms.room_price = room_price;
        rooms.room_photo = fileName;
        rooms.room_photo_path = url;

        await rooms.save();
        return res.status(200).json({ msg: "Room has been updated !" });
    } catch (error) {
        return res.status(500).json({ error: "Error ! cannot update" });
    }
};
