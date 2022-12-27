import Rooms from "../models/RoomsModel.js";
import { Op } from "sequelize";
import Facilities from "../models/FacilitiesModel.js";
import fs from "fs";
<<<<<<< HEAD
import RoomFacilities from "../models/RoomFacilitiesModel.js";
=======
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a

// get all room
export const getRooms = async (req, res) => {
    try {
        let response = await Rooms.findAll({
            include: {
                model: Facilities,
                attributes: ["name_facilities"],
            },
        });
        if (!response) return res.status(404).json({ msg: "Data Not Found !" });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

<<<<<<< HEAD
=======
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

export const searchRoom = async (req, res) => {
    try {
        const response = await Rooms.findAll({
            where: {
                room_price: {
                    [Op.lte]: req.params.range_harga,
                },
            },
        });
        if (!response) return res.status(404).json({ msg: "Data Not Found !" });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
// get room by Id
export const getRoomById = async (req, res) => {
    const id = req.params.id_room
    try {
        let response = await Rooms.findOne({
            where: {
                id_room: id
            },
            include: {
                model: Facilities,
                attributes: ["name_facilities"]
            }
        });
        if (!response) return res.status(404).json({msg: "Data not found !"});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


// add Room
export const addRoom = async (req, res) => {
    let formatName = new Date().toISOString().slice(0, 10);
    let codeRoom = req.body.kodeKamar;
    let nameRoom = req.body.namaKamar;
    let descriptionRoom = req.body.deskripsiKamar;
    let priceRoom = req.body.hargaKamar;
    let photoRoom = formatName + "-" + req.body.filename;

    try {
        await Rooms.create({
            room_code: codeRoom,
            room_name: nameRoom,
            room_description: descriptionRoom,
            room_price: priceRoom,
            room_photo: photoRoom,
        });
        res.status(200).json({ msg: "Room has been added !" });
    } catch (error) {
        console.log(error.message);
    }
<<<<<<< HEAD
=======

    /* await Rooms.sequelize.query(
        `INSERT INTO rooms (room_code, room_name, room_description, room_price, room_photo)
    VALUES ("${codeRoom}", "${nameRoom}", "${descriptionRoom}", ${priceRoom}, "${photoRoom}");`,
        (err, rows) => {
            if (err) return res.status(500).json(err);
            console.log("Data berhasil dihapus !");
            return res.status(200).json(rows);
        }
<<<<<<< HEAD
    ); */
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
}
=======
    );
};
>>>>>>> 0dd5f69646504871ef31c376c64662f6673526d5

// update room by Id
export const updateRoomById = async (req, res) => {
    const id = req.params.id_room;
    try {
        let response = await Rooms.findOne({
            where: {
                id_room: id
            }
        });
        if (!response) return res.status(404).json({msg: "Data not found"});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// update room by Id
export const updateRoomById = async (req, res) => { // ngambil parameter id room
    let id = req.params.id_room;
    const { newCode , newName , newDesc , newPrice ,newFilename} = req.body;

    let formatName = new Date().toISOString().slice(0, 10);
    let codeRoom =newCode;
    let nameRoom =newName;
    let descriptionRoom =newDesc;
    let priceRoom =newPrice;
    let photoRoom = formatName+"-"+newFilename;

    let data = await Rooms.findOne({
        where: {
            id_room: id
        }
    })



    if(!data) throw err;

    console.log(data);
    console.log(data.id_room);

  

    console.log("ini newcode : ", codeRoom);

    try {
        await Rooms.update({
            room_code: codeRoom,
            room_name: nameRoom,
            room_description: descriptionRoom,
            room_price: priceRoom,
            room_photo: photoRoom,
        },{
            where : {
                id_room : data.dataValues.id_room
            }
        })
     
        res.status(200).json({msg : "Room updated"});
    } catch (error) {
        console.log("ERROR KARENA : ",error.message);
    }
};

// delete room
export const deleteRoomById = async (req, res) => {
    const id = req.params.id_room;
    let response = await Rooms.findOne({
        where: {
            id_room: id
        }
    });
    if (!response) return res.status(404).json({ msg: "Data not found !" });
    try {
        const rooms = await Rooms.destroy({
            where: {
                id_room: response.id_room,
            },
        });
        // ambil gambar spesifik
        const filePath = "./public/images/" + Rooms.room_photo;
        // hapus gambar
        fs.unlinkSync(filePath);
        // hapus dari DB
        await rooms.save();
        return res.json({ msg: "Room has been deleted !" });
    } catch (error) {
        return res
            .status(500)
            .json({ error: `Error ! cannot delete : ${error}` });
    }
};

<<<<<<< HEAD

// example code
// update room by id
/* const rooms = await Rooms.findOne({
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

=======

// example code
// update room by id
/* const rooms = await Rooms.findOne({
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
<<<<<<< HEAD
            id_room: req.params.id_room
        }
=======
            id_room: req.params.id_room,
        },
>>>>>>> 0dd5f69646504871ef31c376c64662f6673526d5
    });
    rooms.room_code = room_code;
    rooms.room_name = room_name;
    rooms.room_description = room_description;
    rooms.room_price = room_price;
    rooms.room_photo = fileName;
    rooms.room_photo_path = url;

<<<<<<< HEAD
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
    await rooms.save();
    return res.status(200).json({ msg: "Room has been updated !" });
} catch (error) {
    return res.status(500).json({ error: "Error ! cannot update" });
<<<<<<< HEAD
} */
=======
} */
=======
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
>>>>>>> 0dd5f69646504871ef31c376c64662f6673526d5
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
