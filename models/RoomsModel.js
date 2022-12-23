import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Facilities from "./FacilitiesModel.js";
import RoomFacilities from "./RoomFacilitiesModel.js";

const { DataTypes } = Sequelize;

/* column for rooms table
id_room PK
room_code
room_name
room_description
room_price
room_photo */

const Rooms = db.define(
    "rooms", {
    id_room: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    room_code: {
        type: DataTypes.TEXT
    },
    room_name: {
        type: DataTypes.TEXT
    },
    room_description: {
        type: DataTypes.TEXT
    },
    room_price: {
        type: DataTypes.DOUBLE
    },
    room_photo: {
        type: DataTypes.TEXT
    }
},
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Rooms.belongsToMany(Facilities, { through: RoomFacilities });
Facilities.belongsToMany(Rooms, { through: RoomFacilities });

export default Rooms;