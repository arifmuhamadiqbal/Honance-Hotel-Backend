import Rooms from "../models/RoomsModel.js";
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

//get room by ID
export const getRoomByID = async (req, res) => {
    try {
        const response = await Rooms.findOne({
            where: {
                id_room: req.params.id_room,
            },
        });
        if (!response) return res.status(404).json({ msg: "Data Not Found !" });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// add room
export const addRooms = async (req, res) => {
    const codeRoom = req.body.kodeKamar;
    const nameRoom = req.body.namaKamar;
    const descriptionRoom = req.body.deskripsiKamar;
    const priceRoom = req.body.hargaKamar;

    // jika file tidak terbaca
    if (req.files === null)
        return res.status(404).json({ msg: "Image not found" });

    console.log(req.files);
    // get file
    const file = req.files;
    // ukuran file
    const fileSize = file.data.length;
    // ekstensi file
    const ext = path.extname(file.name);
    // file yang sudah terenskripsi + ekstensi
    const fileName = file.md5 + ext;
    // url untuk ke DB
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}}`;
    // ekstensi yang diizinakan
    const allowedExt = [".jpg", ".png", ".jpeg"];
    // cek apakah ekstensi jpg, jpeg, atau png
    // jika tidak sesuai maka akan ditolak
    if (!allowedExt.includes(ext.toLowerCase()))
        return res.status(442).json({ msg: "Image extension not allowed" });
    // cek apakah ukuran image tidak lebih dari 5 MB
    if (fileSize > 5000000)
        return res.status(442).json({ msg: "Image must be less than 5 MB" });

    const photoRoom = fileName;
    const pathPhotoRoom = url;
    console.log(codeRoom);
    return;
    try {
        const tambah = await Rooms.create({
            room_code: codeRoom,
            room_name: nameRoom,
            room_description: descriptionRoom,
            room_price: priceRoom,
            room_photo: photoRoom,
            room_photo_path: pathPhotoRoom,
        });
        console.log(tambah);
        return res.status(200).json({ msg: "Kamar berhasil ditambahkan" });
    } catch (error) {
        return res.status(500).json(error.message);
    }

    // memasukkan gambar ke dalam folder images di dalam folder public
    /* file.mv(`./public/images/${fileName}`, async (err) => {}); */
};

// delete room
export const deleteRoomById = async (req, res) => {
    const rooms = await Rooms.findOne({
        where: {
            id_room: req.params.id_room,
        },
    });
    if (!rooms) return res.status(404).json({ msg: "Data not found !" });
    try {
        // ambil gambar spesifik
        const filePath = `./public/images/${rooms.room_photo}`;
        // hapus gambar
        fs.unlinkSync(filePath);
        // hapus dari DB
        await Rooms.destroy({
            where: {
                id_room: req.params.id_room,
            },
        });
        await rooms.destroy();
        return res.json({ msg: "Room deleted !" });
    } catch (error) {
        return res.status(500).json({ error: "Error ! cannot delete" });
    }
};

// update room
export const updateRoomById = async (req, res) => {
    const rooms = await Rooms.findOne({
        where: {
            id_room: req.params.id_room,
        },
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
            return res
                .status(442)
                .json({ msg: "Image must be less than 5 MB" });

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
                id_room: req.params.id_room,
            },
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
