import express from "express";
import { getBookings, bookRoom } from "../controller/BookingsController.js";

const bookingsRoute = express.Router();

bookingsRoute.get("/bookings", getBookings);
bookingsRoute.post("/book", bookRoom);

export default bookingsRoute;