import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  ownerEmail: String,     // 🔥 new
  carId: String,
  carName: String,
  pricePerDay: Number,
  pickupDate: String,
  returnDate: String,
  location: String
});


export default mongoose.model("Booking", bookingSchema);
