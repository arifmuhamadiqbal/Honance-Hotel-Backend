import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* column for bookings table
id_booking PK
booking_code
id_room FK
user_name
user_email
user_phone
date_in
date_out
total */

const Bookings = db.define(
    "bookings", {
        id_booking: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        booking_code: {
            type: DataTypes.TEXT
        },
        id_room: {
            type: DataTypes.INTEGER
        },
        user_name: {
            type: DataTypes.TEXT
        },
        user_email: {
            type: DataTypes.TEXT
        },
        user_phone: {
            type: DataTypes.TEXT
        },
        date_in: {
            type: DataTypes.DATE
        },
        date_out: {
            type: DataTypes.DATE
        },
        total: {
            type: DataTypes.DOUBLE
        }
    },
    {
        timestamps: false,
    }
)

export default Bookings;

(async () => {
    db.sync();
});
