import express from "express";
import { addUsers, getUsersByUsername } from "../controller/UsersController.js";

const usersRoute = express.Router();

usersRoute.post("/login", getUsersByUsername);
usersRoute.post("/adduser", addUsers);

export default usersRoute;