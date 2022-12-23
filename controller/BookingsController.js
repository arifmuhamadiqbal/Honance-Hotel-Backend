import Bookings from "../models/BookingsModel.js";

// get bookings
export const getBookings = async (req, res) => {
    try {
        let response = await Bookings.sequelize.query(
            "SELECT * FROM bookings JOIN rooms ON bookings.id_room = rooms.id_room ORDER BY id_booking ASC"
        );
        if (!response) return res.status(404).json({ msg: "Data Not Found !" });
        console.log(response);
        res.status(200).json(response[0]);
    } catch (error) {
        console.log(error.message);
    }
};

// add booking
export const bookRoom = async (req, res) => {
    let bookDate = new Date().toISOString().slice(0, 10);
    const id_room = req.body.idroom;
    const bUsername = req.body.username;
    const bEmail = req.body.email;
    const bPhone = req.body.nohp;
    const bCheckin = req.body.checkin;
    const bCheckout = req.body.checkout;
    const bookingFormat = bookDate + "-" + bUsername + "-" + bPhone;
    const bTotal = req.body.total;
    try {
        const booking = await Bookings.create({
            booking_code: bookingFormat,
            id_room: id_room,
            user_name: bUsername,
            user_email: bEmail,
            user_phone: bPhone,
            date_in: bCheckin,
            date_out: bCheckout,
            total: bTotal,
        });
        console.log(booking);
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
