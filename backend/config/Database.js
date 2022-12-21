import { Sequelize } from "sequelize";

const db = new Sequelize(
    "honancehotel_factvalley", 
    "honancehotel_factvalley",
    "66a2168241f93df415b09e2241e3c7170e919d71",
    {
    host: "12a.h.filess.io",
    port: "3307",
    dialect: "mysql",
});

export default db;