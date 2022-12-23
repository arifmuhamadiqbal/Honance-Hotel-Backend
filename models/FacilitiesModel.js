import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* column for facilities table 
id_facilities
facilities_name */

const Facilities = db.define(
    "facilities", {
    id_facilities: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_facilities: {
        type: DataTypes.TEXT
    }
},
    {
        freezeTableName: true,
        timestamps: false,
    }
)

export default Facilities;