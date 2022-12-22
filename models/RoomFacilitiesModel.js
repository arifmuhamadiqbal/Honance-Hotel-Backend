import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const RoomFacilities = db.define(
    "roomfacilities", {
        id_room_facilities: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

export default RoomFacilities;
