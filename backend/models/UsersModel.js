import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* column for user table
id_user PK
username
email
password */

const Users = db.define(
    "users", {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
    }
)

export default Users;

(async () => {
    db.sync();
});
