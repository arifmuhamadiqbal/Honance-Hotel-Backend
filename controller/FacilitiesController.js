import Facilities from "../models/FacilitiesModel.js";
import Rooms from "../models/RoomsModel.js";

// get facilities
export const getFacilities = async (req, res) => {
    try {
        let response = await Facilities.findAll(
           /*  {
            include: Rooms
        } */
        );
        if (!response) return res.status(404).json({msg: "Data not found !"});
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// add facilities
export const addFacilities = async (req, res) => {
    const facName = req.body.name_facilities;
    try {
        const facilities = await Facilities.create({
            name_facilities: facName
        });
        return res.json(facilities);
    } catch (error) {
        console.log(error.message);
    }
}

// delete facilities by Id
export const deleteFacilitiesById = async (req, res) => {
    const id = req.params.id_facilities;
    try {
        const facilities = await Facilities.destroy({
            where: {
                id_facilities: id
            }
        });
        if (!facilities) return res.status(404).json({msg: "Data not Found !"});
        res.status(200).json({msg: "Facilities deleted !"});
    } catch (error) {
        console.log(error.message);
    }
};