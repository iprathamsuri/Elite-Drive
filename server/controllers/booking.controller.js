import Booking from "../models/Booking.js";

/* Create booking */
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Get customer bookings */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userEmail: req.params.email
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Get owner bookings */
export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      ownerEmail: req.params.email
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Delete booking */
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
