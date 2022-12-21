import Users from "../models/UsersModel.js";

export const getUsersByUsername = async (req, res) => {
    try {
        const uName = req.body.username;
        const uPassword = req.body.password;
        let response = await Users.findOne({
            where: {
                username: uName,
                password: uPassword,
            }
        });
        if (!response) return res.send({message: "User not found !"});
        res.send(response);
        console.log(response.dataValues);
    } catch (error) {
        console.log(error.message);
    }
};

export const addUsers = async (req, res) => {
    const uName = req.body.username;
    const uEmail = req.body.email;
    const uPassword = req.body.password;
    try {
        const users = await Users.create({
            username: uName,
            email: uEmail,
            password: uPassword
        });
        return res.json(users);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};