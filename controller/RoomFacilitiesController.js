import RoomFacilities from "../models/RoomFacilitiesModel.js";

// add room facilities
export const addRoomFacilities = async (req, res) => {
    try {
        let response = await RoomFacilities.create({
            id_room: req.body.id_room,
            id_facilities: req.body.id_facilities
        })
        if (!response) return res.status(404).json({msg: "Failed !"});
        res.json({msg: "Add room facilities successful !"})
    } catch (error) {
        console.log(error.message);
    }
}