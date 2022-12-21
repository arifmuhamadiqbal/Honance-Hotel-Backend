import express from "express";
import cors from "cors";
import usersRoute from "./routes/UsersRoute.js";
import roomsRoute from "./routes/RoomsRoute.js";
import bookingsRoute from "./routes/BookingsRoute.js";
import db from "./config/Database.js";

const port = 3020;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(usersRoute);
app.use(roomsRoute);
app.use(bookingsRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

db.authenticate().then(() => {
    console.log("Database Connected !");
}).catch (err => {
    console.error("Unable to connect ! : ", err);
})