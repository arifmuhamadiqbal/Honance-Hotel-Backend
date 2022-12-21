import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* column for rooms table
id_room PK
room_code
room_name
room_description
room_price
room_photo_path */

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
        timestamps: false,
    }
)

export default Rooms;

(async () => {
    db.sync();
});