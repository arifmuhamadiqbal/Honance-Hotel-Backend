import Facilities from "../models/FacilitiesModel.js";

// get facilities
export const getFacilities = async (req, res) => {
    try {
        let response = await Facilities.findAll();
        if (!response) return res.status(404).json({msg: "Data not found !"});
        console.log(response);
        res.status(200).json(response[0]);
    } catch (error) {
        console.log(error.message);
    }
}

// add facilities
export const addFacilities = async (req, res) => {
    const facName = req.body.nameFacilities;
    try {
        const facilities = await Facilities.create({
            facilities_name: facName
        });
        return res.json(facilities);
    } catch (error) {
        console.log(error.message);
    }
}