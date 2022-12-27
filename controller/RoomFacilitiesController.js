import RoomFacilities from "../models/RoomFacilitiesModel.js";
import Rooms from "../models/RoomsModel.js";

// get all room facilities
export const getRoomFacilities = async (req, res) => {
    try {
        let response = await RoomFacilities.findAll()
        if (!response) return res.send(404).json({msg: "Data not found !"})
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// get facilities by Id
export const getRoomFacilitiesById = async (req, res) => {
    const id = req.params.id_room;
    try {
        let response = await RoomFacilities.findAll({
            where: {
                roomIdRoom: id
            },
            attributes: ["facilityIdFacilities"],
        });
        if (!response) return res.send(404).json({msg: "Data not found !"});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// get all room facilities
export const getRoomFacilities = async (req, res) => {
    try {
        let response = await RoomFacilities.findAll()
        if (!response) return res.send(404).json({msg: "Data not found !"})
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// get facilities by Id
export const getRoomFacilitiesById = async (req, res) => {
    const id = req.params.id_room;
    try {
        let response = await RoomFacilities.findOne({
            where: {
                id_room: id
            }
        });
        if (!response) return res.send(404).json({msg: "Data not found !"});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// add room facilities
export const addRoomFacilities = async (req, res) => {
    const {FKid_room, FKid_facilities} = req.body;
    try {
        let response = await RoomFacilities.create({
            roomIdRoom: FKid_room,
            facilityIdFacilities: FKid_facilities
        })
        if (!response) return res.status(404).json({msg: "Failed !"});
        res.json({msg: "Add room facilities successful !"})
    } catch (error) {
        console.log(error.message);
    }
};

// update room facilities by Id
export const updateRoomFacilitiesById = async (req, res) => {
    const {FKid_room, FKid_facilities} = req.body;
<<<<<<< HEAD
    console.log("ini fk id room : ", FKid_room);
    console.log("ini fk id facilities : ", FKid_facilities);
    let response = await RoomFacilities.findAll({
        where: {
            roomIdRoom: FKid_room
        },
        attributes: ["facilityIdFacilities"]
=======
    let response = await RoomFacilities.findOne({
        where: {
            id_room_facilities: req.params.id_room
        },
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
    });
    if (!response) return res.status(404).json({msg: "Data not found !"});
    try {
        await RoomFacilities.update(
        {
<<<<<<< HEAD
=======
            roomIdRoom: FKid_room,
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
            facilityIdFacilities: FKid_facilities
        },
        {
            where: {
<<<<<<< HEAD
                roomIdRoom: FKid_room
=======
                id_room_facilities: response.id_room_facilities
>>>>>>> 7330518a1004457fd775beaa8bc44d3aa069b00a
            },
        }
        );
        res.status(200).json({msg: "Room facilities has been updated !"});
    } catch (error) {
        console.log(error.message);
    }
};

// delete room facilities by Id
export const deleteRoomFacilitiesById = async (req, res) => {
    let response = await RoomFacilities.findOne({
        where: {
            id_room_facilities: req.params.id_room
        },
    });
    if (!response) return res.status(404).json({msg: "Data not found !"});
    try {
        await RoomFacilities.destroy({
            where: {
                id_room_facilities: response.id_room_facilities
            }
        })
    } catch (error) {
        console.log(error.message);
    }
};